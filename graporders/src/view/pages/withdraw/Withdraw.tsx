import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/transaction/form/transactionFormActions";
import authActions from "src/modules/auth/authActions";
import { Link } from "react-router-dom";

// Custom Modal Component (updated to theme)
const CustomModal = ({ visible, title, onClose, children }) => {
  if (!visible) return null;

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: #1a1a1a;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 28px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
          animation: slideIn 0.3s ease;
        }

        .modal-header {
          padding: 18px 24px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-header h3 {
          margin: 0;
          color: #d4af37;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: #d4af37;
        }

        .modal-body {
          padding: 24px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Update schema to include withdrawal method
const schema = yup.object().shape({
  amount: yupFormSchemas.integer(i18n("entities.transaction.fields.amount"), {
    required: true,
    min: 5,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
  withdrawalMethod: yup.string().required(i18n("pages.withdraw.validation.selectMethod")),
});

function Withdraw() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  
  // State for modals
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  // Check if bank details are complete
  const hasCompleteBankDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.accountHolder &&
      currentUser.accountHolder.trim() !== "" &&
      currentUser.ibanNumber &&
      currentUser.ibanNumber.trim() !== "" &&
      currentUser.bankName &&
      currentUser.bankName.trim() !== "" &&
      currentUser.ifscCode &&
      currentUser.ifscCode.trim() !== ""
    );
  }, [currentUser]);

  // Check if crypto details are complete
  const hasCompleteCryptoDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.trc20 &&
      currentUser.trc20.trim() !== "" &&
      currentUser.walletname &&
      currentUser.walletname.trim() !== "" &&
      currentUser.usernamewallet &&
      currentUser.usernamewallet.trim() !== "" &&
      currentUser.preferredcoin &&
      currentUser.preferredcoin.trim() !== ""
    );
  }, [currentUser]);

  // Get missing bank fields
  const getMissingBankFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.accountHolder) missing.push(i18n("entities.transaction.fields.accountHolder"));
    if (!currentUser?.ibanNumber) missing.push(i18n("entities.transaction.fields.ibanNumber"));
    if (!currentUser?.bankName) missing.push(i18n("entities.transaction.fields.bankName"));
    if (!currentUser?.ifscCode) missing.push(i18n("entities.transaction.fields.ifscCode"));
    return missing;
  }, [currentUser]);

  // Get missing crypto fields
  const getMissingCryptoFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.trc20) missing.push(i18n("user.fields.trc20"));
    if (!currentUser?.walletname) missing.push(i18n("pages.wallet.walletName"));
    if (!currentUser?.usernamewallet) missing.push(i18n("pages.wallet.username"));
    if (!currentUser?.preferredcoin) missing.push(i18n("pages.wallet.choosePreferredCoin"));
    return missing;
  }, [currentUser]);

  const onSubmit = async ({ amount, withdrawPassword, withdrawalMethod }) => {
    // Check if the selected method has complete details
    if (withdrawalMethod === "bank" && !hasCompleteBankDetails()) {
      setSelectedMethod("bank");
      setShowBankModal(true);
      return;
    }
    
    if (withdrawalMethod === "crypto" && !hasCompleteCryptoDetails()) {
      setSelectedMethod("crypto");
      setShowCryptoModal(true);
      return;
    }

    const values = {
      status: "pending",
      date: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      amount: amount,
      vip: currentUser,
      withdrawPassword: withdrawPassword,
      withdrawalMethod: withdrawalMethod,
   
    };
    
    await dispatch(actions.doCreate(values));
    await refreshItems();
  };

  const [initialValues] = useState({
    amount: "",
    withdrawalMethod: "",
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  // Withdrawal method options
  const withdrawalMethodOptions = [
    { value: "crypto", label: "Cryptocurrency (TRC20/ERC20)" },
    { value: "bank", label: "Bank Transfer" },
  ];

  return (
    <div>
      {/* Bank Details Modal */}
      {showBankModal && (
        <CustomModal
          visible={showBankModal}
          title={i18n('pages.withdraw.bankModal.title')}
          onClose={() => setShowBankModal(false)}
        >
          <div style={{ textAlign: "center", color: "#fff" }}>
            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "48px", color: "#d4af37", marginBottom: "15px" }}></i>
            <h3 style={{ marginBottom: "15px", color: "#d4af37" }}>{i18n('pages.withdraw.bankModal.required')}</h3>
            <p style={{ marginBottom: "20px", color: "rgba(255,255,255,0.7)" }}>
              {i18n('pages.withdraw.bankModal.description')}
            </p>
            <ul style={{ textAlign: "left", marginBottom: "20px", color: "rgba(255,255,255,0.8)", listStyle: "none", padding: 0 }}>
              {getMissingBankFields().map((field, index) => (
                <li key={index} style={{ marginBottom: "10px", padding: "10px", background: "rgba(212,175,55,0.1)", borderRadius: "12px", border: "1px solid rgba(212,175,55,0.3)" }}>
                  <i className="fa-solid fa-times" style={{ color: "#d4af37", marginRight: "8px" }}></i>
                  {field}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setShowBankModal(false)}
                style={{
                  padding: "12px 20px",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "40px",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  flex: 1,
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                {i18n('common.cancel')}
              </button>
              <Link to="/bind-account" style={{ flex: 1 }}>
                <button
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "40px",
                    background: "linear-gradient(145deg, #d4af37, #b8960f)",
                    color: "#0a0a0a",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  {i18n('pages.withdraw.goToBindAccount')}
                </button>
              </Link>
            </div>
          </div>
        </CustomModal>
      )}

      {/* Crypto Details Modal */}
      {showCryptoModal && (
        <CustomModal
          visible={showCryptoModal}
          title={i18n('pages.withdraw.cryptoModal.title')}
          onClose={() => setShowCryptoModal(false)}
        >
          <div style={{ textAlign: "center", color: "#fff" }}>
            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "48px", color: "#d4af37", marginBottom: "15px" }}></i>
            <h3 style={{ marginBottom: "15px", color: "#d4af37" }}>{i18n('pages.withdraw.cryptoModal.required')}</h3>
            <p style={{ marginBottom: "20px", color: "rgba(255,255,255,0.7)" }}>
              {i18n('pages.withdraw.cryptoModal.description')}
            </p>
            <ul style={{ textAlign: "left", marginBottom: "20px", color: "rgba(255,255,255,0.8)", listStyle: "none", padding: 0 }}>
              {getMissingCryptoFields().map((field, index) => (
                <li key={index} style={{ marginBottom: "10px", padding: "10px", background: "rgba(212,175,55,0.1)", borderRadius: "12px", border: "1px solid rgba(212,175,55,0.3)" }}>
                  <i className="fa-solid fa-times" style={{ color: "#d4af37", marginRight: "8px" }}></i>
                  {field}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setShowCryptoModal(false)}
                style={{
                  padding: "12px 20px",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "40px",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  flex: 1,
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                {i18n('common.cancel')}
              </button>
              <Link to="/bind-account" style={{ flex: 1 }}>
                <button
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "40px",
                    background: "linear-gradient(145deg, #d4af37, #b8960f)",
                    color: "#0a0a0a",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  {i18n('pages.withdraw.goToBindAccount')}
                </button>
              </Link>
            </div>
          </div>
        </CustomModal>
      )}

      <style>{`
        /* Luxury car theme for Withdraw page */
        .withdraw-page-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px 16px;
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .label__form {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }

        .label__form span[style*="color: red"] {
          color: #d4af37 !important;
          margin-right: 4px;
        }

        .input, .select-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
          font-size: 15px;
          background: rgba(255,255,255,0.02);
          color: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input:focus, .select-input:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.2);
        }

        .input::placeholder, .select-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .button {
          width: 100%;
          background: linear-gradient(145deg, #d4af37, #b8960f);
          border: none;
          border-radius: 40px;
          padding: 14px 18px;
          color: #0a0a0a;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(212,175,55,0.3);
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
          margin-top: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button:hover {
          transform: scale(1.02);
          background: linear-gradient(145deg, #e0b84d, #c9a227);
          box-shadow: 0 14px 30px rgba(212,175,55,0.5);
        }

        .button:active {
          transform: scale(0.98);
          box-shadow: 0 6px 16px rgba(212,175,55,0.4);
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .balance-info {
          display: block;
          margin-bottom: 24px;
          font-size: 16px;
          color: #ffffff;
          font-weight: 600;
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
          border-left: 4px solid #d4af37;
        }

        .announcement-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          padding: 16px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
        }

        .speaker {
          font-size: 1.4rem;
          color: #d4af37;
        }

        .announcement-text {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          line-height: 1.5;
        }

        /* Method selection styles */
        .method-selection {
          display: flex;
          gap: 16px;
          margin: 10px 0 5px;
          flex-wrap: wrap;
        }

        .method-card {
          flex: 1;
          min-width: 140px;
          padding: 20px 12px;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.02);
        }

        .method-card.selected {
          border-color: #d4af37;
          background: rgba(212,175,55,0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212,175,55,0.2);
        }

        .method-card:hover {
          border-color: #d4af37;
          transform: translateY(-2px);
        }

        .method-icon {
          font-size: 36px;
          color: #d4af37;
          margin-bottom: 12px;
        }

        .method-label {
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
          font-size: 15px;
        }

        .method-status {
          font-size: 12px;
          margin-top: 8px;
          padding: 6px 12px;
          border-radius: 40px;
          display: inline-block;
          background: rgba(255,255,255,0.05);
          border: 1px solid transparent;
        }

        .status-complete {
          color: #81c784;
          border-color: #81c784;
        }

        .status-incomplete {
          color: #ffb74d;
          border-color: #ffb74d;
        }

        .preview-box {
          padding: 16px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #ffffff;
        }

        .preview-box i {
          color: #d4af37;
          margin-right: 8px;
        }

        .error-message {
          color: #ef5350;
          font-size: 13px;
          margin-top: 6px;
        }

        .tip-box {
          margin-top: 24px;
          padding: 16px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tip-box i {
          color: #d4af37;
          font-size: 20px;
        }

        .tip-box a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
          margin-right: 4px;
        }

        .tip-box a:hover {
          text-decoration: underline;
        }

        /* Override any inline styles from the original */
        .method-card i,
        .method-card div,
        .method-card span {
          color: inherit;
        }

        .method-status {
          background: rgba(255,255,255,0.05);
        }

        .preview-box strong {
          color: #d4af37;
        }
      `}</style>

      <SubHeader title={i18n('pages.withdraw.title')} path="/profile" />
      <div className="withdraw-page-container">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Available Balance */}
            <span className="balance-info">
              <i className="fa-solid fa-wallet" style={{ marginRight: '8px', color: '#d4af37' }}></i>
              {i18n('pages.withdraw.availableBalance')} : ${currentUser?.balance?.toFixed(2) || 0} 
            </span>

            {/* Amount Field */}
            <div className="form-group">
              <div className="label__form">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{i18n('pages.withdraw.withdrawAmount')}</span>
              </div>
              <InputFormItem
                type="number"
                name="amount"
                placeholder={i18n('pages.withdraw.amountPlaceholder')}
                className="input"
              />
            </div>

            {/* Withdrawal Method Selection */}
            <div className="form-group">
              <div className="label__form">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{i18n('pages.withdraw.selectMethod')}</span>
              </div>
              
              <div className="method-selection">
                {/* Crypto Option */}
                <div 
                  className={`method-card ${form.watch('withdrawalMethod') === 'crypto' ? 'selected' : ''}`}
                  onClick={() => form.setValue('withdrawalMethod', 'crypto', { shouldValidate: true })}
                >
                  <i className="fa-brands fa-bitcoin method-icon"></i>
                  <div className="method-label">{i18n('pages.withdraw.methods.crypto')}</div>
                  <div className={`method-status ${hasCompleteCryptoDetails() ? 'status-complete' : 'status-incomplete'}`}>
                    {hasCompleteCryptoDetails() ? i18n('pages.withdraw.status.complete') : i18n('pages.withdraw.status.incomplete')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>{i18n('pages.withdraw.methods.cryptoNetworks')}</div>
                </div>

                {/* Bank Option */}
                <div 
                  className={`method-card ${form.watch('withdrawalMethod') === 'bank' ? 'selected' : ''}`}
                  onClick={() => form.setValue('withdrawalMethod', 'bank', { shouldValidate: true })}
                >
                  <i className="fa-solid fa-building-columns method-icon"></i>
                  <div className="method-label">{i18n('pages.withdraw.methods.bank')}</div>
                  <div className={`method-status ${hasCompleteBankDetails() ? 'status-complete' : 'status-incomplete'}`}>
                    {hasCompleteBankDetails() ? i18n('pages.withdraw.status.complete') : i18n('pages.withdraw.status.incomplete')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>{i18n('pages.withdraw.methods.bankNetworks')}</div>
                </div>
              </div>
              
              {/* Hidden input for form validation */}
              <input 
                type="hidden" 
                {...form.register('withdrawalMethod')} 
              />
              {form.formState.errors.withdrawalMethod && (
                <div className="error-message">
                  <i className="fa-solid fa-exclamation-circle" style={{ marginRight: '4px' }}></i>
                  {form.formState.errors.withdrawalMethod.message}
                </div>
              )}
            </div>

            {/* Display selected method details preview */}
            {form.watch('withdrawalMethod') === 'crypto' && hasCompleteCryptoDetails() && (
              <div className="preview-box">
                <i className="fa-brands fa-bitcoin"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br/>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                  {currentUser?.preferredcoin?.toUpperCase()}: {currentUser?.trc20?.substring(0, 12)}...
                </span>
              </div>
            )}

            {form.watch('withdrawalMethod') === 'bank' && hasCompleteBankDetails() && (
              <div className="preview-box">
                <i className="fa-solid fa-building-columns"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br/>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                  {currentUser?.bankName} - {currentUser?.accountHolder}
                </span>
              </div>
            )}

            {/* Withdraw Password Field */}
            <div className="form-group withdraw-password-section">
              <div className="label__form">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{i18n('pages.withdraw.withdrawPassword')}</span>
              </div>
              <InputFormItem
                type="password"
                name="withdrawPassword"
                placeholder={i18n('pages.withdraw.withdrawPasswordPlaceholder')}
                className="input"
              />
            </div>

            {/* Announcement */}
            <div className="announcement-container">
              <i className="fa-solid fa-volume-high speaker" aria-hidden="true"></i>
              <div className="announcement-text">
                {i18n('pages.withdraw.announcement')}
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="button"
              type="submit"
            >
              <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i>
              {i18n('pages.withdraw.confirm')}
            </button>

            {/* Help text for incomplete profiles */}
            {(!hasCompleteBankDetails() || !hasCompleteCryptoDetails()) && (
              <div className="tip-box">
                <i className="fa-solid fa-info-circle fa-lg"></i>
                <span>
                  {i18n('pages.withdraw.completeDetailsIn')}{' '}
                  <Link to="/bind-account">
                    {i18n('pages.bindAccount.title')}
                  </Link> 
                  {i18n('pages.withdraw.enableAllOptions')}
                </span>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Withdraw;