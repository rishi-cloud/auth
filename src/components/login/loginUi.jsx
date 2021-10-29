import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import "./style.css";
import Login from "./Login";
import translate from "../../localization/translate";

const LoginUI = (props) => {
    const {
        onChange,
        switchLogin,
        onToggle,
        onSubmit,
        LoginError,
        LoginForm,
        validateEmail,
        Continue,
        onPressContinue,
        getOtp,
        socialBtn,
    } = props;
    const { setWhichPage } = useContext(AppContext);

    return (
        <>
            <div className="LoginContainer">
                <div className="LoginLeftWrapper">
                    <div className="LoginWelcomeContainer">
                        <img
                            alt="McAfeeLogo"
                            className="LoginPageLogo"
                            src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
                        />
                        <div className="LoginIntro">
                            {translate("Welcome_back_to")} McAfee !!
                        </div>
                        <div className="LoginIntroSubHeading">
                            {translate("choose_your_signIn_method_continue")}
                        </div>
                        <div className="LoginBottomHeading">
                            <div>{translate("Do_not_have_an_account")}</div>
                            <div
                                className="Login-page-link"
                                onClick={() => {
                                    setWhichPage("signup-page");
                                }}
                            >
                                Create one now
                            </div>
                        </div>
                    </div>
                </div>
                <div className="LoginRightWrapper">
                    <Login
                        LoginError={LoginError}
                        onChange={onChange}
                        switchLogin={switchLogin}
                        onSubmit={onSubmit}
                        LoginForm={LoginForm}
                        onToggle={onToggle}
                        onPressContinue={onPressContinue}
                        Continue={Continue}
                        getOtp={getOtp}
                        validateEmail={validateEmail}
                        socialBtn={socialBtn}
                    />
                </div>
            </div>
        </>
    );
};

export default LoginUI;
