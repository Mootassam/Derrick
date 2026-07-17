import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Product from "../models/product";
import UserRepository from "./userRepository";
import RecordRepository from "./recordRepository";
import Error405 from "../../errors/Error405";
import Error400 from "../../errors/Error400";
import Records from "../models/records";
import Dates from "../utils/Dates";
import fs from "fs";
import path from "path";
class ProductRepository {


  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await Product(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    );

    return this.findById(record.id, options);
  }


  private static async fetchData(value: any, vipNumber: number) {
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "vipCars",
      `VIP${vipNumber}.json`
    );

    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);

      const dataRaw = data?.items;
      if (!dataRaw) {
        console.warn(`No items found in ${filePath}`);
        return [];
      }

      const cars = dataRaw || [];
      if (!Array.isArray(cars)) {
        console.warn(`${filePath} does not contain a cars array`);
        return [];
      }

      const values = cars.map((item) => ({
        title: item.title || 'No Title',
        image: item.img || 'No Image',
        commission: value.comisionrate,
        vip: value.vipId,
        amount: this.generateRandomPrice(value.min, value.max)
      }));

      return values;
    } catch (error) {
      console.error(`Error reading local data from ${filePath}:`, error);
      throw error;
    }
  }


  private static generateRandomPrice(minStr: string, maxStr: string): string {
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (isNaN(min) || isNaN(max)) {
      return '0.00';
    }

    const randomPrice = (Math.random() * (max - min) + min).toFixed(2);
    return randomPrice;
  }
  // VIP 1 - Lamborghini
  static async Vip1(value: any) {
    return await ProductRepository.fetchData(value, 1);
  }

  // VIP 2 - Ferrari
  static async Vip2(value: any) {
    return await ProductRepository.fetchData(value, 2);
  }

  // VIP 3 - Bentley

  static async Vip3(value: any) {
    return await ProductRepository.fetchData(value, 3);
  }

  // VIP 4 - Aston Martin
  static async Vip4(value: any) {
    return await ProductRepository.fetchData(value, 4);
  }

  // VIP 5 - Bugatti
  static async Vip5(value: any) {
    return await ProductRepository.fetchData(value, 5);
  }




  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).updateOne(
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

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id).populate("vip"),
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

      if (filter.title) {
        criteriaAnd.push({
          title: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.title),
            $options: "i",
          },
        });
      }

      if (filter.amount) {
        criteriaAnd.push({
          amount: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.amount),
            $options: "i",
          },
        });
      }
      if (filter.vip) {
        criteriaAnd.push({
          vip: filter.vip,
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Product(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .populate("vip")
      .sort(sort);

    const count = await Product(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
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

    const records = await Product(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }



  static async findAllAutocompleteProduct(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
      {
        // Filter by type: either "combo" OR "prizes"
        type: {
          $in: ["combo", "prizes"]
        }
      }
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            title: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("title_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Product(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Product(options.database).modelName,
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
    output.photo = await FileRepository.fillDownloadUrl(output.photo);

    return output;
  }

  static async grapOrders(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentVip = currentUser.vip.id;
    const mergeDataPosition = currentUser.itemNumber;
    const giftPosition = currentUser.prizesNumber;

    if (!currentUser?.vip) {
      throw new Error400(options.language, "validation.requiredSubscription");
    }

    // Check for pending orders
    const pendingRecords = await Records(options.database).find({
      user: currentUser.id,
      status: 'pending'
    });

    if (pendingRecords.length > 0) {
      throw new Error400(options.language, "validation.submitPendingProducts");
    }

    // Check daily order limit
    const dailyOrder = currentUser.vip.dailyorder;

    // BONUS CONDITION: Check if user has completed all daily tasks
    // Note: We do NOT update the user's bonus or welcomeBonus because no order is placed.
    if (currentUser.bonus === true && currentUser.tasksDone === dailyOrder) {
      // User is eligible to place an order using the bonus, but we don't modify the database.
      // Just proceed (the balance check below will allow it because welcomeBonus > minbalance).
      console.log("User would use welcome bonus for this order (no DB update)");
    } else if (currentUser.tasksDone >= dailyOrder) {
      throw new Error400(options.language, "validation.moretasks");
    }

    // Check balance with bonus condition
    // Check if user can use welcome bonus instead of real balance
    if (currentUser.welcomeBonus > currentUser.minbalance && currentUser.bonus === true) {
      // User can proceed using welcome bonus (no balance deduction)
    } else {
      // No welcome bonus available – check actual balance
      if (currentUser.balance <= 0) {
        throw new Error400(options.language, "validation.deposit");
      }
      if (currentUser.balance < currentUser.minbalance) {
        // Throw error with minbalance amount
        throw new Error400(options.language, "validation.insufficientBalanceMin",
          currentUser.minbalance,
        );

      }
    }

    // Special VIP products (milestone rewards)
    if (currentUser?.product?.length > 0 && currentUser.tasksDone === (mergeDataPosition - 1)) {
      let product = currentUser.product[0];
      product.photo = await FileRepository.fillDownloadUrl(product?.photo);
      return product;
    } else if (currentUser?.prizes && currentUser.tasksDone === (giftPosition - 1)) {
      let product = currentUser.prizes;
      product.photo = await FileRepository.fillDownloadUrl(product?.photo);
      return product;
    }

    // -------------------------
    // Normal product selection
    // -------------------------

    let finalPrice: number;

    if (currentUser.vip.isFixedAmount) {
      // Use min/max as fixed price
      const vipMinPrice = parseFloat(currentUser.vip.min) || 20;
      const vipMaxPrice = parseFloat(currentUser.vip.max) || 50;
      const minPrice = Math.min(vipMinPrice, vipMaxPrice);
      const maxPrice = Math.max(vipMinPrice, vipMaxPrice);
      finalPrice = Math.random() * (maxPrice - minPrice) + minPrice;
    } else {
      // Use min/max as percentage of balance
      const vipMinPercentage = parseFloat(currentUser.vip.min) || 20;
      const vipMaxPercentage = parseFloat(currentUser.vip.max) || 50;
      const minPercent = Math.min(vipMinPercentage, vipMaxPercentage);
      const maxPercent = Math.max(vipMaxPercentage, vipMaxPercentage);
      const randomPercentage = Math.random() * (maxPercent - minPercent) + minPercent;
      finalPrice = (currentUser.balance * randomPercentage) / 100;
      if (finalPrice > currentUser.balance) {
        throw new Error400(options.language, "validation.deposit");
      }
    }

    finalPrice = Math.round(finalPrice * 100) / 100;

    // Get random normal product
    let products = await Product(options.database)
      .find({ vip: currentVip, type: 'normal' })
      .populate("vip");

    if (products.length === 0) {
      throw new Error400(options.language, "validation.noProductsAvailable");
    }

    const randomIndex = Math.floor(Math.random() * products.length);
    const selectedProduct = products[randomIndex];

    // Prepare the product for return (no record created, no balance updated)
    selectedProduct.amount = finalPrice.toString();
    selectedProduct.photo = await FileRepository.fillDownloadUrl(selectedProduct?.photo);

    return selectedProduct;
  }




}

export default ProductRepository;
