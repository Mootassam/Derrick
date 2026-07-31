import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password")], i18n("auth.passwordChange.mustMatch")),
  username: yupFormSchemas.string(
    i18n("user.fields.email"),
    { required: true,
      email: true,
    }
  ),
  invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  // UI-only placeholder state for the Email OTP row (verification logic to be wired later)
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [initialValues] = useState({
    email: "",
    password: "",
    withdrawPassword: "",
    invitationcode: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const handleSendOtp = () => {
    // UI only for now — wire up the real OTP dispatch/API call later
    setOtpSent(true);
  };

  const onSubmit = ({
    email,
    password,
    withdrawPassword,
    invitationcode,
  }) => {
    // phoneNumber slot kept as a placeholder until the OTP flow replaces it
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        "",
        withdrawPassword,
        invitationcode
      )
    );
  };

  return (
    <div className="auth__page">
      <div className="auth__card">
        <div className="auth__header">
          <img src="/logo.png" alt="Logo" className="auth__logo" />
          <h1 className="auth__title">{i18n('pages.auth.signup.createAccount')}</h1>
          <p className="auth__description">
            {i18n('pages.auth.signup.signupForAccount')}
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="auth__form">
              {/* Email */}
              <div className="form__group">
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("user.fields.username")}
                  className="auth__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>

              {/* Email OTP (UI only — verification wiring comes later) */}
              <div className="form__group otp-group">
                <div className="otp-row">
                  <input
                    type="text"
                    className="auth__input otp-input"
                    placeholder="Enter OTP code"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="otp-button"
                    onClick={handleSendOtp}
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </button>
                </div>
                {otpSent && (
                  <span className="otp-hint">Code sent to your email</span>
                )}
              </div>

              {/* Withdraw Password */}
              <div className="form__group">
                <InputFormItem
                  type="text"
                  name="username"
                  placeholder={i18n("user.fields.email")}
                  className="auth__input"
                />
              </div>

              {/* Password */}
              <div className="form__group">
                <InputFormItem
                  type="password"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="auth__input"
                />
              </div>

              {/* Confirm Password */}
              <div className="form__group">
                <InputFormItem
                  type="password"
                  name="newPasswordConfirmation"
                  autoComplete="new-password"
                  placeholder={i18n("user.fields.confirmPassword")}
                  className="auth__input"
                />
              </div>

              {/* Invitation Code */}
              <div className="form__group">
                <InputFormItem
                  type="text"
                  name="invitationcode"
                  placeholder={i18n("user.fields.invitationcode")}
                  className="auth__input"
                />
              </div>
            </div>

            <div className="auth__bottom">
              <button className="auth__button" disabled={loading} type="submit">
                <ButtonIcon loading={loading} />
                <span>{i18n('pages.auth.signup.signupButton')}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="signup-text">
                <span>{i18n('pages.auth.signup.alreadyHaveAccount')}</span>
                <Link to="/auth/signin" className="signup-link">
                  {i18n('auth.signin')}
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
          background-color: #0a0a0a;
        }

        .auth__page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop') center/cover no-repeat fixed;
          padding: 0px;
          position: relative;
        }

        .auth__page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(3px);
          z-index: 1;
        }

        .auth__card {
          width: 100%;
          max-width: 480px;
          background: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(16px);
          padding: 32px 24px 36px;
          z-index: 10;
          box-shadow: 0 12px 40px rgba(136, 189, 31, 0.08);
          border: 1px solid rgba(136, 189, 31, 0.15);
          border-radius: 24px;
        }

        .auth__header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth__logo {
          height: 36px;
          width: auto;
          margin: 0 auto 20px;
          display: block;
          filter: brightness(0) invert(1);
        }

        .auth__title {
          font-size: 26px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .auth__description {
          font-size: 14px;
          color: #9ed13a;
          opacity: 0.9;
          letter-spacing: 0.3px;
        }

        .auth__form {
          margin-bottom: 20px;
        }

        .form__group {
          margin-bottom: 16px;
        }

        .auth__input {
          width: 100%;
          padding: 12px 18px;
          border: 1px solid rgba(136, 189, 31, 0.3);
          border-radius: 30px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.05) !important;
          color: white;
          transition: border 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .auth__input:focus {
          outline: none;
          border-color: #88bd1f;
          box-shadow: 0 0 0 3px rgba(136, 189, 31, 0.2);
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .auth__input::placeholder {
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }

        /* Email OTP row */
        .otp-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .otp-row {
          display: flex;
          gap: 10px;
        }

        .otp-input {
          flex: 1;
          letter-spacing: 4px;
          font-weight: 600;
        }

        .otp-button {
          flex-shrink: 0;
          padding: 0 20px;
          border-radius: 30px;
          border: 1px solid rgba(136, 189, 31, 0.5);
          background: rgba(136, 189, 31, 0.12);
          color: #9ed13a;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .otp-button:hover {
          background: rgba(136, 189, 31, 0.22);
          border-color: #88bd1f;
          color: #b8e14a;
        }

        .otp-hint {
          font-size: 12px;
          color: #9ed13a;
          padding: 0 6px;
        }

        .auth__bottom {
          text-align: center;
        }

        .auth__button {
          width: 100%;
          background: linear-gradient(145deg, #a3d633, #6a9c1c);
          border: none;
          border-radius: 34px;
          padding: 14px 18px;
          color: #0a0a0a;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(136, 189, 31, 0.4);
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .auth__button:hover {
          transform: scale(1.02);
          background: linear-gradient(145deg, #b8e14a, #7bb01f);
          box-shadow: 0 14px 30px rgba(136, 189, 31, 0.55);
        }

        .auth__button:active {
          transform: scale(0.98);
          box-shadow: 0 6px 16px rgba(136, 189, 31, 0.4);
        }

        .auth__button i {
          font-size: 15px;
        }

        .signup-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
        }

        .signup-link {
          color: #9ed13a;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          transition: color 0.2s;
        }

        .signup-link:hover {
          color: #b8e14a;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Signup;
