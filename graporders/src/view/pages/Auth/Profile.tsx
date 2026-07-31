import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import Message from "src/view/shared/message";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Storage from "src/security/storage";
import SubHeader from "src/view/shared/Header/SubHeader";

const schema = yup.object().shape({
  avatars: yupFormSchemas.images(i18n("inputs.avatars"), {
    max: 1,
  }),
});

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const totalperday = useSelector(selectors.selectTotalPerday);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [recharge, setRecharge] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [showReputation, setShowReputation] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const referenceCodeRef = useRef(null);

  // Check KYC status from user model (kyc is a boolean field)
  const isVerified = currentUser?.kyc === true;

  useEffect(() => {
    const values = { status: "completed" };
    dispatch(actions.doCountDay());
    dispatch(actions.doFetch(values, values));
  }, [dispatch]);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const [initialValues] = useState(() => {
    const record = currentUser || {};
    return {
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const goto = (param) => {
    history.push(param);
  };

  const copyToClipboardCoupon = () => {
    const referenceCode = referenceCodeRef.current.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(referenceCode)
        .then(() => Message.success(i18n('pages.profile.copied')))
        .catch((error) => console.error("Error copying to clipboard:", error));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success(i18n('pages.profile.copied'));
    }
  };

  const getMaskedPhone = () => {
    const phone = currentUser?.phone || "567***229";
    if (phone && phone.length > 6) {
      return phone.slice(0, 3) + "***" + phone.slice(-3);
    }
    return phone;
  };

  const userScore = currentUser?.score || 0;

  // Handle KYC verification click
  const handleKycClick = () => {
    if (!isVerified) {
      // Redirect to KYC verification page
      goto("/proof"); // Update this to your actual KYC verification page path
    }
    // If already verified, do nothing (no redirect)
  };

  // Dynamic menu items with verification status
  const menuItems = {
    main: [
      {
        icon: "fas fa-wallet",
        name: i18n('pages.profile.recharge'),
        action: () => goto("/deposit"),
      },
      {
        icon: "fas fa-arrow-up",
        name: i18n('pages.profile.withdraw'),
        action: () => goto("/withdraw"),
      },
      {
        icon: "fas fa-id-card",
        name: i18n('pages.profile.bindAccount'),
        action: () => goto("/bind-account"),
      },
      {
        icon: "fas fa-file-alt",
        name: i18n('pages.profile.details'),
        action: () => goto("/details"),
      },
    ],
    other: [
      // Verification item with proper logic
      {
        icon: isVerified ? "fas fa-check-circle" : "fas fa-shield-alt",
        name: isVerified 
          ? i18n('pages.profile.verifiedStatus.verified') || "Verified"
          : i18n('pages.profile.verifiedStatus.notVerified') || "Not Verified",
        action: handleKycClick, // Only redirects if not verified
        verified: isVerified,
      },
      {
        icon: "fas fa-globe",
        name: i18n('pages.profile.officialWebsite'),
        action: () => window.open("https://Stellantis.com", "_blank"),
      },
      {
        icon: "fas fa-certificate",
        name: "MSB Certification",
        action: () => goto("/msb-certification"),
      },
      {
        icon: "fas fa-star",
        name: i18n('pages.profile.reputation.title'),
        action: () => setShowReputation(true),
      },
      // {
      //   icon: "fas fa-calendar-alt",
      //   name: i18n('pages.activities.title'),
      //   action: () => goto("/activities"),
      // },
      {
        icon: "fas fa-crown",
        name: i18n('pages.vip.title'),
        action: () => goto("/vip"),
      },
      {
        icon: "fas fa-headset",
        name: i18n('pages.profile.contactUs'),
        action: () => goto("/support"),
      },
      {
        icon: "fas fa-key",
        name: i18n('pages.profile.changeLoginPassword'),
        action: () => goto("/security"),
      },
      {
        icon: "fas fa-lock",
        name: i18n('pages.profile.changeWithdrawPassword'),
        action: () => goto("/change-withdrawal-password"),
      },
      {
        icon: "fas fa-language",
        name: i18n('pages.profile.languages'),
        action: () => goto("/language"),
      },
      {
        icon: "fas fa-question-circle",
        name: i18n('pages.help.title'),
        action: () => goto("/help"),
      },
      {
        icon: "fas fa-info-circle",
        name: i18n('pages.actions.company'),
        action: () => goto("/company"),
      },
      {
        icon: "fas fa-sign-out-alt",
        name: i18n('pages.profile.logout'),
        action: doSignout,
      },
    ],
  };

  return (
    <div className="profile-container">
      <SubHeader title={i18n('pages.profile.title')} path="/profile" />

      <div className="user-info-section">
        <div className="user-avatar">
          <FormProvider {...form}>
            <form>
              <ImagesFormItem
                name="avatars"
                storage={Storage.values.userAvatarsProfiles}
                max={1}
              />
            </form>
          </FormProvider>
        </div>
        <div className="user-details">
          <div className="user-phone">{currentUser?.email || "131784"}</div>
          <div className="user-uid">{i18n('pages.profile.uid')}: {currentUser?.mnemberId || "131784"}</div>
          <div className="invitation-row">
            <span className="invitation-label">{i18n('pages.profile.invitationCode')}:</span>
            <span ref={referenceCodeRef} className="invitation-code">
              {currentUser.refsystem ? currentUser?.refcode || "64WS65" : "******"}
            </span>
            <i
              className="fa-regular fa-copy copy-icon"
              onClick={copyToClipboardCoupon}
            />
          </div>
        </div>
      </div>

      <div className="menu-sections">
        <div className="menu-section">
       
          <div className="main-function-items">
            {menuItems.main.map((item, index) => (
              <div
                key={index}
                className="main-function-item"
                onClick={item.action}
              >
                <div className="main-icon-circle">
                  <i className={item.icon} />
                </div>
                <span className="main-item-label">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <div className="section-title">
            {i18n('pages.profile.otherFunction')}
          </div>
          <div className="section-items">
            {menuItems.other.map((item, index) => (
              <div
                key={index}
                className={`menu-item ${item.verified ? 'verified' : ''}`}
                onClick={item.action}
                style={{ cursor: item.verified ? 'default' : 'pointer' }}
              >
                <div className="item-left">
                  <i className={item.icon} style={{ color: item.verified ? '#5fcf3a' : '#9ed13a' }}></i>
                  <span style={{ color: item.verified ? '#5fcf3a' : '#ffffff' }}>
                    {item.name}
                  </span>
                </div>
                {!item.verified && <i className="fas fa-chevron-right item-arrow"></i>}
                {item.verified && <i className="fas fa-check-circle item-arrow" style={{ color: '#5fcf3a' }}></i>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {recharge && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{i18n('pages.profile.rechargeModal.title')}</div>
              <i
                className="fas fa-times modal-close"
                onClick={() => setRecharge(false)}
              />
            </div>
            <p className="modal-text">
              {i18n('pages.profile.rechargeModal.text')}
            </p>
            <div
              className="modal-confirm"
              onClick={() => goto("/support")}
            >
              {i18n('pages.profile.confirm')}
            </div>
          </div>
        </div>
      )}

      {showReputation && (
        <div className="modal-overlay" onClick={() => setShowReputation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{i18n('pages.profile.reputation.title')}</div>
              <i
                className="fas fa-times modal-close"
                onClick={() => setShowReputation(false)}
              />
            </div>
            <div className="reputation-score">
              {userScore}
            </div>
            <div className="progress-labels">
              <span>0</span>
              <span>80</span>
              <span>100</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(userScore, 100)}%` }}
              />
            </div>
            <p className="reputation-description">
              {i18n('pages.profile.reputation.description')}
            </p>
          </div>
        </div>
      )}

      {showVerificationModal && (
        <div className="modal-overlay" onClick={() => setShowVerificationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{i18n('pages.profile.verificationModal.title')}</div>
              <i
                className="fas fa-times modal-close"
                onClick={() => setShowVerificationModal(false)}
              />
            </div>
            <p className="modal-text">
              {i18n('pages.profile.verificationModal.text')}
            </p>
            <div
              className="modal-confirm"
              onClick={() => {
                goto("/");
                setShowVerificationModal(false);
              }}
            >
              {i18n('pages.profile.verificationModal.continue')}
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #0a0a0a;
        }

        .profile-container {
          background: linear-gradient(135deg, #0a0a0a 0%, #0f130a 100%);
          min-height: 100vh;
          color: #ffffff;
          font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* User Info Section */
        .user-info-section {
          background: linear-gradient(145deg, #0f0f0f, #0a0a0a);
          border-bottom: 1px solid rgba(136, 189, 31, 0.3);
          min-height: 160px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 20px;
          position: relative;
          overflow: hidden;
        }

        .user-info-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(136, 189, 31, 0.08), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, #1e1e1e, #0a0a0a);
          border: 2px solid #88bd1f;
          flex-shrink: 0;
          z-index: 2;
          box-shadow: 0 0 20px rgba(136, 189, 31, 0.3);
          transition: all 0.3s ease;
        }

        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(136, 189, 31, 0.5);
        }

        .user-avatar .images-form-item {
          width: 100%;
          height: 100%;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details {
          flex: 1;
          z-index: 2;
        }

        .user-phone {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #ffffff;
          letter-spacing: -0.3px;
          font-family: 'Playfair Display', serif;
        }

        .user-uid {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        .invitation-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          width: fit-content;
          background: rgba(136,189,31,0.1);
          padding: 6px 14px 6px 12px;
          border-radius: 40px;
          border: 1px solid rgba(136,189,31,0.3);
          backdrop-filter: blur(8px);
        }

        .invitation-label {
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }

        .invitation-code {
          font-family: 'Monaco', monospace;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #9ed13a;
        }

        .copy-icon {
          cursor: pointer;
          color: #9ed13a;
          font-size: 14px;
          transition: all 0.2s;
        }

        .copy-icon:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }

        /* Menu Sections */
        .menu-sections {
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding: 10px 20px 32px 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #9ed13a;
          padding: 0 0 12px 0;
          margin-bottom: 20px;
          border-bottom: 2px solid rgba(136,189,31,0.35);
          display: inline-block;
          width: auto;
          font-family: 'Playfair Display', serif;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #88bd1f, transparent);
        }

        /* Main Function - Horizontal Tiles */
        .main-function-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .main-function-item {
          flex: 1 1 0;
          min-width: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border-radius: 20px;
          padding: 8px 4px;
          transition: all 0.2s;
        }

        .main-function-item:hover {
          transform: translateY(-4px);
        }

        .main-icon-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(136,189,31,0.2), rgba(136,189,31,0.05));
          color: #9ed13a;
          font-size: 24px;
          border: 1px solid rgba(136,189,31,0.4);
          transition: all 0.3s;
        }

        .main-function-item:hover .main-icon-circle {
          background: linear-gradient(135deg, rgba(136,189,31,0.3), rgba(136,189,31,0.1));
          transform: scale(1.1);
          border-color: #88bd1f;
          box-shadow: 0 0 15px rgba(136,189,31,0.3);
        }

        .main-item-label {
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.2px;
        }

        /* Other Function - Vertical List */
        .section-items {
          display: flex;
          flex-direction: column;
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(136,189,31,0.2);
          overflow: hidden;
          margin-bottom: 60px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 1px solid rgba(136,189,31,0.1);
          color: #ffffff;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item:hover:not(.verified) {
          background: rgba(136,189,31,0.1);
          padding-left: 24px;
        }

        .menu-item.verified:hover {
          background: rgba(15, 15, 15, 0.6);
        }

        .item-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .item-left i {
          width: 24px;
          font-size: 18px;
          text-align: center;
          transition: transform 0.2s;
        }

        .menu-item:hover:not(.verified) .item-left i {
          transform: scale(1.1);
        }

        .item-left span {
          font-size: 15px;
          font-weight: 500;
        }

        .item-arrow {
          font-size: 12px;
          transition: transform 0.2s;
        }

        .menu-item:hover:not(.verified) .item-arrow {
          transform: translateX(4px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(145deg, #0f0f0f, #0a0a0a);
          color: #ffffff;
          border-radius: 32px;
          width: 90%;
          max-width: 340px;
          padding: 28px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(136,189,31,0.3);
          border: 1px solid rgba(136,189,31,0.3);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #9ed13a;
          font-family: 'Playfair Display', serif;
        }

        .modal-close {
          cursor: pointer;
          font-size: 20px;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .modal-close:hover {
          color: #9ed13a;
          background: rgba(136,189,31,0.1);
          transform: rotate(90deg);
        }

        .modal-text {
          margin-bottom: 24px;
          line-height: 1.6;
          color: rgba(255,255,255,0.75);
          font-size: 14px;
        }

        .modal-confirm {
          background: linear-gradient(145deg, #a3d633, #6a9c1c);
          color: #0a0a0a;
          text-align: center;
          padding: 14px;
          border-radius: 40px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        .modal-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(136,189,31,0.4);
          background: linear-gradient(145deg, #b8e14a, #7bb01f);
        }

        /* Reputation modal */
        .reputation-score {
          font-size: 48px;
          font-weight: 800;
          text-align: center;
          margin: 16px 0 12px;
          color: #9ed13a;
          font-family: 'Playfair Display', serif;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
          padding: 0 4px;
          font-weight: 500;
        }

        .progress-bar-container {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          margin: 8px 0 20px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(136,189,31,0.3);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #88bd1f, #d4e88a);
          border-radius: 4px;
          transition: width 0.3s ease;
          position: relative;
        }

        .reputation-description {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          text-align: left;
          margin-top: 16px;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .user-info-section {
            padding: 20px 16px;
            gap: 12px;
          }
          
          .user-avatar {
            width: 65px;
            height: 65px;
          }
          
          .user-phone {
            font-size: 18px;
          }
          
          .invitation-row {
            font-size: 11px;
            padding: 4px 10px 4px 8px;
          }
          
          .main-icon-circle {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
          
          .main-item-label {
            font-size: 11px;
          }
          
          .menu-sections {
            padding: 10px 16px 28px 16px;
          }
          
          .menu-item {
            padding: 14px 16px;
          }
          
          .item-left span {
            font-size: 14px;
          }
          
          .modal-content {
            padding: 24px;
            margin: 0 16px;
          }
          
          .modal-title {
            font-size: 20px;
          }
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #88bd1f;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a3d633;
        }
      `}</style>
    </div>
  );
}

export default Profile;