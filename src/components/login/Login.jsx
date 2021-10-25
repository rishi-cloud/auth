import React from "react";
import "./style.css";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import SocialButtons from "./socialLogin";

const Login = (props) => {
  const {
    onChange,
    switchLogin,
    onSubmit,
    LoginError,
    LoginForm,
    onToggle,
    getOtp,
    socialBtn,
  } = props;
  return (
    <div className="LoginWrapperContainer">
      <form className="LoginInputWrapper">
        {!switchLogin && (
          <>
            <div className="LoginInputContainer">
              {LoginForm.email !== "" ? (
                <div className="LoginInputLabel">
                  {translate("emailAddress")}
                </div>
              ) : null}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  border:
                    LoginError.isEmailError === true
                      ? "2px solid red"
                      : LoginError.isEmailError === false
                      ? "2px solid green"
                      : "",
                  backgroundColor: "#ffff",
                  borderRadius: "1rem",
                }}
              >
                <AiOutlineMail className="LoginInputLogo" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={LoginForm.email}
                  placeholder="Email"
                  className="LoginInput"
                  onChange={onChange}
                />
              </div>
            </div>
          </>
        )}
        {LoginError.email && <div className="Error">{LoginError.email}</div>}
        {!switchLogin && (
          <>
            <div className="LoginInputContainer">
              {LoginForm.password !== "" ? (
                <div className="LoginInputLabel">{translate("password")}</div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  borderRadius: "1rem",
                  backgroundColor: "#ffff",
                }}
              >
                <MdLockOutline className="LoginInputLogo" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="LoginInput"
                  onChange={onChange}
                />
              </div>
            </div>
          </>
        )}
        {switchLogin && LoginForm.otpAvailable && (
          <>
            <div className="LoginInputContainer">
              <div className="LoginInputLabel">
                {translate("one_time_passcode")}
              </div>
              <input
                id="otp"
                name="otp"
                className="LoginInput"
                onChange={onChange}
              />
            </div>
          </>
        )}
        <button className="RequestOtp" onClick={onSubmit}>
          {/* {!switchLogin ? (
                            <div>Sign in</div>
                        ) : LoginForm.otpAvailable ? (
                            <div>Sign in</div>
                        ) : (
                            <div>Request one-time passcode</div>
                        )} */}
          <div>{translate("signIn")}</div>
        </button>
      </form>
      {LoginError.errorCode && (
        <div className="Error">{translate(LoginError.errorCode)}</div>
      )}

      <div className="SwitchContainer">
        <div className="Switch">{translate("or")}</div>
        {/* <button className="SwitchBtn" onClick={onToggle}>
                        {!switchLogin ? (
                            <div>Sign in with a one-time passcode</div>
                        ) : (
                            <div>Sign in with password</div>
                        )}
                    </button> */}
        {!switchLogin && (
          <button className="SwitchBtn" onClick={getOtp}>
            <div>{translate("Sign_in_with_a_onetime_passcode")}</div>
          </button>
        )}
        {switchLogin && (
          <button className="SwitchBtn" onClick={onToggle}>
            <div>{translate("signIn_with_password")}</div>
          </button>
        )}
      </div>
      <SocialButtons socialBtn={socialBtn} />
    </div>
  );
};

export default Login;
