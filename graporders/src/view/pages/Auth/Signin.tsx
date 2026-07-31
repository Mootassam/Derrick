import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
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

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const handleLanguageToggle = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="auth__page">
      {/* Language switcher */}
      {/* <div className="language-switcher">
        <button onClick={handleLanguageToggle} className="lang-btn" aria-label="Switch language">
          <i className="fa-solid fa-language" />
        </button>
      </div> */}

      <div className="auth__card">
        <div className="auth__header">
          <img src="/logo.png" alt="Logo" className="auth__logo" />
          <h1 className="auth__title">{i18n('pages.auth.signin.welcomeBack')}</h1>
          <p className="auth__description">{i18n('pages.auth.signin.signinToAccount')}</p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="auth__form">
              <div className="form__group">
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("user.fields.username")}
                  className="auth__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>

              <div className="form__group">
                <InputFormItem
                  type="password"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="auth__input"
                />
              </div>

              {/* Remember me & forgot password row */}
              <div className="form__row-actions">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    {...form.register("rememberMe")}
                    defaultChecked={initialValues.rememberMe}
                  />
                  <span>{i18n("user.fields.rememberMe")}</span>
                </label>
                {/* optional forgot link can be added here */}
              </div>
            </div>

            <div className="auth__bottom">
              <button className="auth__button" disabled={loading} type="submit">
                <ButtonIcon loading={loading} />
                <span>{i18n('pages.auth.signin.signinButton')}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="signup-text">
                <span>{i18n('pages.auth.signin.noAccount')}</span>
                <Link to="/auth/signup" className="signup-link">
                  {i18n('pages.auth.signin.signupHere')}
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
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

        /* dark overlay over background */
        .auth__page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(3px);
          z-index: 1;
        }

        .language-switcher {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 20;
        }

        .lang-btn {
          background: rgba(10, 10, 10, 0.7);
          font-size: 24px;
          cursor: pointer;
          width: 48px;
          height: 48px;
          backdrop-filter: blur(8px);
          color: #88bd1f;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lang-btn:hover {
          transform: scale(1.05);
          border-color: #a3d633;
          box-shadow: 0 0 15px #88bd1f;
        }

        .auth__card {
          width: 100%;
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(16px);
          padding: 32px 24px 36px;
          z-index: 10;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 12px 40px rgba(136, 189, 31, 0.05);
        }

        .auth__header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth__logo {
          height: 40px;
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
          color: #88bd1f;
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
          background: rgba(255, 255, 255, 0.05);
          color: white;
          transition: border 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .auth__input:focus {
          outline: none;
          border-color: #88bd1f;
          box-shadow: 0 0 0 3px rgba(136, 189, 31, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .auth__input::placeholder {
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }

        /* override possible external background */
        .auth__input {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        .form__row-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 8px 0 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox input[type="checkbox"] {
          accent-color: #88bd1f;
          width: 16px;
          height: 16px;
        }

        .auth__bottom {
          text-align: center;
        }

        .auth__button {
          width: 100%;
          background: linear-gradient(145deg, #88bd1f, #6a9c1c);
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
          background: linear-gradient(145deg, #a3d633, #729c1f);
          box-shadow: 0 14px 30px rgba(136, 189, 31, 0.6);
        }

        .auth__button:active {
          transform: scale(0.98);
          box-shadow: 0 6px 16px rgba(136, 189, 31, 0.5);
        }

        .auth__button i {
          font-size: 15px;
        }

        .signup-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
        }

        .signup-link {
          color: #88bd1f;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          transition: color 0.2s;
        }

        .signup-link:hover {
          color: #a3d633;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Signin;