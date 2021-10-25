import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import Signup from "./Signup";
import "./style.css";
import translate from "../../localization/translate";

const SignupUI = (props) => {
  const {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
  } = props;
  const { setWhichPage } = useContext(AppContext);
  return (
    <>
      <div className="SignupWrapper">
        <div className="leftContainer">
          <img
            alt="McAfeeLogo"
            className="Logo"
            src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
          />
          <div className="Intro">Create your McAfee account</div>
          <div className="IntroSubHeading">
            <div className="Points">
              {translate(
                "Enter_your_email_address_set_password_and_well_get_your_account_created"
              )}
            </div>
          </div>

          <div className="BottomHeadingSignUp">
            {translate("Already have a account ?")}
            <p
              className="page-link"
              onClick={() => {
                setWhichPage("login-page");
              }}
            >
              Login
            </p>
          </div>
        </div>
        <div className="RightContainer">
          <Signup
            onChange={onChange}
            onSubmit={onSubmit}
            SignupForm={SignupForm}
            onClick={onClick}
            passwordRules={passwordRules}
            PasswordPolicyState={PasswordPolicyState}
            isValid={isValid}
            SignupError={SignupError}
          ></Signup>
        </div>
      </div>
    </>
  );
};

export default SignupUI;
