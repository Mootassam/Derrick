import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Records from "../models/records";
import Dates from "../utils/Dates";
import Product from "../models/product";
import UserRepository from "./userRepository";
import User from "../models/user";
import Error400 from "../../errors/Error400";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

class RecordRepository {
static async create(data, options: IRepositoryOptions) {
  const { database } = options;
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);
  const mergeDataPosition = currentUser.itemNumber;
  const prizesPosition = currentUser.prizesNumber;
  const isPrizesMatch = currentUser.tasksDone === (prizesPosition - 1);
  
  // Get daily order limit from user's VIP
  const dailyOrder = currentUser.vip?.dailyorder;

  // Execute parallel checks
  await Promise.all([
    this.checkOrder(options),
    this.calculeGrap(data, options)
  ]);

  // Calculate position conditions
  const hasProduct = currentUser?.product?.[0]?.id;
  const isPositionMatch = currentUser.tasksDone === (mergeDataPosition - 1);
  const hasPrizes = currentUser?.prizes?.id;
  
  // ==================== COMBO MODE ====================
  if (hasProduct && isPositionMatch) {
    // Create record for each product in user's product array
    const recordDataArray = currentUser.product.map((productId, index) => {
      return {
        number: `${data.number}-${index}`,
        product: productId,
        price: productId?.amount,
        commission: productId?.commission,
        user: data.user || currentUser.id,
        status: index === 0 ? (data.status || "pending") : "frozen",
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        date: Dates.getDate(),
        datecreation: Dates.getTimeZoneDate(),
      };
    });

    const records = await Records(database).create(recordDataArray, options);

    // Calculate new tasksDone after combo
    const newTasksDone = currentUser.tasksDone + currentUser.product.length;
    
    // Prepare update object
    const updateObj: any = {
      $inc: { tasksDone: currentUser.product.length },
      $set: { updatedAt: new Date(), updatedBy: currentUser.id }
    };
    
    // BONUS CONDITION: Check if this completion will reach or exceed daily limit
    if (currentUser.bonus === true && dailyOrder && newTasksDone >= dailyOrder) {
      updateObj.$set.bonus = false;
      updateObj.$set.welcomeBonus = 0;
    }
    
    // Update user
    await User(database).updateOne(
      { _id: currentUser.id },
      updateObj
    );

    // Audit logs
    records.forEach(record => {
      this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        data,
        options
      ).catch(console.error);
    });

    return this.findById(records[0].id, options);
  }

  // ==================== PRIZES MODE ====================
  else if (hasPrizes && isPrizesMatch) {
    // Calculate new tasksDone after prize claim
    const newTasksDone = currentUser.tasksDone + 1;
    
    // Build the $set part of the update
    const setObj: any = {
      prizes: null,
      prizesNumber: 0,
      tasksDone: newTasksDone,
      updatedAt: new Date(),
      updatedBy: currentUser.id,
    };
    
    // BONUS CONDITION: Check if this completion will reach or exceed daily limit
    if (currentUser.bonus === true && dailyOrder && newTasksDone >= dailyOrder) {
      setObj.bonus = false;
      setObj.welcomeBonus = 0;
    }
    
    const recordData = {
      ...data,
      price: hasPrizes?.amount,
      commission: hasPrizes?.commission,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      date: Dates.getDate(),
      datecreation: Dates.getTimeZoneDate(),
    };

    const [record] = await Records(database).create([recordData], options);

    // Update user with all fields in $set
    await User(database).updateOne(
      { _id: currentUser.id },
      { $set: setObj }
    );

    // Audit log for prize creation
    await this._createAuditLog(AuditLogRepository.CREATE, record.id, recordData, options);

    return this.findById(record.id, options);
  } 
  
  // ==================== NORMAL MODE ====================
  else {
    // 1. Create the record directly using data provided
    const recordData = {
      ...data,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      date: Dates.getDate(),
      datecreation: Dates.getTimeZoneDate(),
      // Ensure status is set (default to "completed" if not provided)
      status: data.status || "completed"
    };

    const [record] = await Records(database).create([recordData], options);

    // 2. Calculate profit from the record's price and commission
    const recordPrice = parseFloat(record.price) || 0;
    const commissionPercent = parseFloat(record.commission) || 0;
    const profit = Number(((commissionPercent / 100) * recordPrice).toFixed(2));

    // 3. Update user: add profit (already added by calculeGrap), increment tasksDone
    const newTasksDone = currentUser.tasksDone + 1;
    const userUpdateObj: any = {
      $inc: {
        tasksDone: 1                     // ✅ profit not incremented again
      },
      $set: {
        updatedBy: currentUser.id,
        updatedAt: new Date()
      }
    };

    // BONUS CONDITION: Check if this completion will reach or exceed daily limit
    if (currentUser.bonus === true && dailyOrder && newTasksDone >= dailyOrder) {
      userUpdateObj.$set.bonus = false;
      userUpdateObj.$set.welcomeBonus = 0;
    }

    await User(database).updateOne({ _id: currentUser.id }, userUpdateObj);

    // 4. Audit log for the new record
    await this._createAuditLog(AuditLogRepository.CREATE, record.id, recordData, options);

    return this.findById(record.id, options);
  }
}

static async checkOrder(options) {
  const currentUser = MongooseRepository.getCurrentUser(options);
  const currentDate = Dates.getTimeZoneDate();

  const [recordCount, userVip] = await Promise.all([
    Records(options.database).countDocuments({
      user: currentUser.id,
      datecreation: currentDate,
    }),
    User(options.database)
      .findById(currentUser.id)
      .select("vip balance tasksDone welcomeBonus minbalance bonus")
      .lean(),
  ]);

  if (!userVip?.vip) {
    throw new Error400(options.language, "validation.requiredSubscription");
  }

  const dailyOrder = userVip.vip.dailyorder;

  if (userVip.tasksDone >= dailyOrder) {
    throw new Error400(options.language, "validation.moretasks");
  }

  if (userVip.welcomeBonus > userVip.minbalance && userVip.bonus === true) {
    // User can proceed using welcome bonus (no balance deduction)
  } else {
    // No welcome bonus available – check actual balance
    if (userVip.balance <= 0) {
      throw new Error400(options.language, "validation.deposit");
    }
    if (userVip.balance < userVip.minbalance) {
      throw new Error400(options.language, "validation.insufficientBalanceMin", userVip.minbalance);
    }
  }
}

static async calculeGrap(data, options) {
  const { database } = options;

  try {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const currentProduct = await Product(database)
      .findById(data.product)
      .lean();

    if (!currentProduct) {
      throw new Error400(options.language, "validation.productNotFound");
    }

    const currentUserBalance = Number(currentUser?.balance || 0);
    const productBalance = Number(currentProduct.amount || 0);
    const currentCommission = Number(currentProduct.commission || 0);

    const mergeDataPosition = currentUser.itemNumber;
    const prizesPosition = currentUser.prizesNumber;

    let total = currentUserBalance;
    let frozen = currentUser.freezeblance || 0;

    const isPositionMatch =
      currentUser.tasksDone === mergeDataPosition - 1;

    const hasPrizes = currentUser?.prizes;
    const isPrizesMatch =
      currentUser.tasksDone === prizesPosition - 1;

    // =====================================================
    // CASE 1 — Combo Mode
    // =====================================================
    if (
      currentUser?.product?.length > 0 &&
      isPositionMatch
    ) {
      let comboprice = 0;

      currentUser.product.forEach((item) => {
        comboprice += Number(item.amount) || 0;
      });

      total = currentUserBalance - comboprice;
      frozen = currentUserBalance;
    }

    // =====================================================
    // CASE 2 — Prize Mode
    // =====================================================
    else if (hasPrizes && isPrizesMatch) {
      total = currentUserBalance + productBalance;
    }

    // =====================================================
    // CASE 3 — Normal Task Mode
    // =====================================================
    else {
      // 1️⃣ Child earning
      const userEarning =
        (currentCommission / 100) * Number(data.price);

      total = currentUserBalance + userEarning;

      // =====================================================
      // 2️⃣ Referral Logic
      // =====================================================
      if (currentUser.invitationcode) {
        const parentUser = await User(database)
          .findOne({ refcode: currentUser.invitationcode });

        if (parentUser && parentUser.refsystem === true) {
          const Company = database.model("company");
          const companySettings = await Company.findOne().lean();

          const defaultCommission =
            Number(companySettings?.defaultCommission || 15);

          const parentEarning =
            userEarning * (defaultCommission / 100);

          await User(database).updateOne(
            { _id: parentUser._id },
            {
              $inc: { balance: parentEarning },
              $set: { updatedAt: new Date() },
            }
          );
        }
      }
    }

    // =====================================================
    // Update Current User
    // =====================================================
    await User(database).updateOne(
      { _id: currentUser._id },
      {
        $set: {
          balance: total,
          freezeblance: frozen,
          updatedAt: new Date(),
        },
      }
    );

  } catch (error) {
    throw error;
  }
}


  static async checkOrderCombo(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = this.getTimeZoneDate(); // Get current date

    const record = await Records(options.database)
      .find({
        user: currentUser.id,
        // Compare dates in the same format
        datecreation: { $in: Dates.getTimeZoneDate() }, // Convert current date to Date object
      })
      .countDocuments();

    const dailyOrder = currentUser.vip.dailyorder;
    const mergeDataPosition = currentUser.itemNumber;

    if (currentUser && currentUser.vip && currentUser.vip.id) {
      if (currentUser.tasksDone >= dailyOrder) {
        throw new Error400(options.language, "validation.moretasks");
      }



      if (currentUser.balance <= 0) {
        throw new Error400(options.language, "validation.InsufficientBalance");
      }

      // if (currentUser.balance <= 49) {
      //     throw new Error405("Your account must have a minimum balance of 50 USDT.");
      //   }


    } else {
      throw new Error400(options.language, "validation.requiredSubscription");
    }
  }


  // Utility functions with validation
  static calculeTotal(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error400(undefined, 'validation.invalidPriceOrCommission');
    }

    return (numPrice * numCommission) / 100;
  }

  static calculeTotalMerge(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error400(undefined, 'validation.invalidPriceOrCommission');
    }

    return numPrice + (numPrice * numCommission) / 100;
  }

  static async CountOrder(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = Dates.getTimeZoneDate();

    const record = await Records(options.database)
      .countDocuments({
        user: currentUser.id,
        datecreation: currentDate
      });

    return { record };
  }

  static async tasksDone(currentUser, options) {
    const user = await User(options.database)
      .findById(currentUser)
      .select('tasksDone')
      .lean();

    if (!user) {
      throw new Error400(options.language, 'validation.userNotFound');
    }

    return { record: user.tasksDone || 0 };
  }





  static getTimeZoneDate() {
    const dubaiTimezone = "Asia/Dubai";

    const options = {
      timeZone: dubaiTimezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const currentDateTime = new Date().toLocaleDateString("en-US", options);

    return currentDateTime;
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }


static async updateStatus(options: IRepositoryOptions) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);
  const session = options?.session;

  try {
    // Fetch the current user with product details
    const user = await User(options.database)
      .findById(currentUser.id)
      .populate('product') // Populate product details to get commission
      .session(session || null);

    if (!user) {
      throw new Error404();
    }

    // Check if user has sufficient balance (not 0 or negative)
    const currentBalance = parseFloat(user.balance) || 0;
    if (currentBalance <= 0) {
      throw new Error400(options.language, 'validation.deposit');
    }

    // Find ALL records that need to be completed (both pending AND frozen)
    const recordsToComplete = await Records(options.database)
      .find({
        tenant: currentTenant.id,
        user: currentUser.id,
        status: { $in: ['pending', 'frozen'] } // Include both statuses
      })
      .populate('product') // Populate to get product details
      .session(session || null);

    if (!recordsToComplete || recordsToComplete.length === 0) {
      throw new Error400(options.language, 'validation.noRecordsToComplete');
    }

    // Update ALL pending and frozen records to completed
    await Records(options.database).updateMany(
      {
        tenant: currentTenant.id,
        user: currentUser.id,
        status: { $in: ['pending', 'frozen'] }
      },
      {
        status: 'completed',
        updatedBy: currentUser.id,
        updatedAt: new Date()
      },
      { session, ...options }
    );

    // COMMON LOGIC: Add frozen balance to balance and reset frozen balance
    const frozenBalance = parseFloat(user.freezeblance) || 0;
    let newBalance = currentBalance + frozenBalance;

    // Handle the specific logic based on whether user has products
    if (user.product && Array.isArray(user.product) && user.product.length > 0) {
      // USER HAS PRODUCTS: Calculate commission from products
      const productIds = user.product.map(product => product._id || product);

      // Filter records that belong to user's products (both pending and frozen)
      const productRecords = recordsToComplete.filter(record =>
        productIds.includes(record.product?._id?.toString() || record.product?.toString())
      );

      let totalCommission = 0;

      // Calculate commission from ALL product records
      for (const record of productRecords) {
        if (record.product && record.product.amount && record.product.commission) {
          const recordCommission = this.calculeTotal(
            record.product.amount,
            record.product.commission
          );
          totalCommission += recordCommission;
        } else if (record.product && record.product.type === "prizes" && record.product.amount) {
          totalCommission += parseFloat(record.product.amount) || 0;
        }
      }

      // Add commission to the new balance
      newBalance += totalCommission;

      // =====================================================
      // REFERRAL EARNING FOR PARENT
      // =====================================================
      if (currentUser.invitationcode) {
        const parentUser = await User(options.database)
          .findOne({ refcode: currentUser.invitationcode })
          .session(session || null);

        if (parentUser && parentUser.refsystem === true) {
          const Company = options.database.model("company");
          const companySettings = await Company.findOne().lean();
          const defaultCommission = Number(companySettings?.defaultCommission || 15);

          // Parent earns defaultCommission % of child's totalCommission
          const parentEarning = totalCommission * (defaultCommission / 100);

          await User(options.database).updateOne(
            { _id: parentUser._id },
            {
              $inc: { balance: parentEarning },
              $set: { updatedAt: new Date() },
            },
            { session, ...options }
          );
        }
      }

      // Update user: clear products, reset itemNumber, update balance with commission
      await User(options.database).updateOne(
        { _id: currentUser.id },
        {
          $set: {
            product: [],       // Clear the product array
            itemNumber: 0,     // Reset itemNumber
            balance: newBalance, // Update with balance + frozen + commission
            freezeblance: 0    // Reset frozen balance to 0
          },
          $inc: {
            tasksDone: productRecords.length
          },
          updatedBy: currentUser.id,
          updatedAt: new Date()
        },
        { session, ...options }
      );

    } else {
      // USER HAS NO PRODUCTS: Just update balance without commission
      const normalRecords = recordsToComplete.filter(record =>
        record.status === 'pending' || !record.product?.type || record.product.type === 'normal'
      );

      await User(options.database).updateOne(
        { _id: currentUser.id },
        {
          $set: {
            balance: newBalance,
            freezeblance: 0
          },
          $inc: {
            tasksDone: normalRecords.length
          },
          updatedBy: currentUser.id,
          updatedAt: new Date()
        },
        { session, ...options }
      );
    }

    // Fire-and-forget audit logs for all completed records
    recordsToComplete.forEach(record => {
      this._createAuditLog(
        AuditLogRepository.UPDATE,
        record._id,
        { status: 'completed', previousStatus: record.status },
        options
      ).catch(console.error);
    });

    // Return first record
    return this.findById(recordsToComplete[0]._id, options);

  } catch (error) {
    throw error;
  }
}





  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async destroyAll(productId, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    await Records(options.database).deleteMany(
      { product: productId, tenant: currentTenant.id },
      options
    );
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database)
        .findById(id)
        .populate("user")
        .populate("product"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.status),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        // ALWAYS: when status is "pending", return both "pending" and "frozen"
        if (filter.status.toLowerCase() === "pending") {
          criteriaAnd.push({
            status: {
              $in: ["pending", "frozen"] // Include both statuses
            }
          });
        } else {
          // For other statuses ("completed", "frozen"), use exact match
          criteriaAnd.push({
            status: filter.status
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let listitems = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("product");

    let rows = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    let total = 0;

    listitems.map((item) => {
      let data = item.product;
      let itemTotal =
        (parseFloat(data.commission) * parseFloat(data.amount)) / 100;

      total += itemTotal;
    });
    total = parseFloat(total.toFixed(3));

    return { rows, count, total };
  }


  static async findAndCountPerDay(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Build criteria for the query
    const criteriaAnd: any = [
      { tenant: currentTenant.id },
      { user: currentUser.id },
      { status: "completed" } // only completed records
    ];

    // Set start and end of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    criteriaAnd.push({
      createdAt: { $gte: start, $lte: end },
    });

    const criteria = { $and: criteriaAnd };
    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    // Fetch the records
    const records = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    // Calculate daily profit
    let totalProfit = 0;

    for (const record of records) {
      const price = parseFloat(record.price || "0"); // convert price to number
      const commission = parseFloat(record.commission || "0"); // convert commission to number

      // Calculate profit = (price * commission%) / 100
      const profit = (price * commission) / 100;
      totalProfit += profit;
    }

    totalProfit = parseFloat(totalProfit.toFixed(3));

    return { total: totalProfit };
  }


  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            titre: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.titre,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Records(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options
    );
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }
    const output = record.toObject ? record.toObject() : record;
    output.product.photo = await FileRepository.fillDownloadUrl(
      output?.product?.photo
    );

    return output;
  }
}

export default RecordRepository;
