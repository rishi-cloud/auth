import React from "react";
import "./style.css";
import Login from "./Login";
import { Link } from "react-router-dom";
import translate from "../../localization/translate";

const LoginUI = (props) => {
    const {
        onChange,
        switchLogin,
        onToggle,
        onSubmit,
        LoginError,
        LoginForm,
        Continue,
        onPressContinue,
        getOtp,
        socialBtn,
        pageConfig,
    } = props;

    const link = `state=${pageConfig.extraParams.state}&client=${pageConfig.clientId}&protocol=${pageConfig.extraParams.protocol}&redirect_uri=${pageConfig.callbackURL}&fragment=${pageConfig.extraParams.fragment}`;
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
                            {translate("Welcome_back_to")} McAfee !
                        </div>
                        <div className="LoginIntroSubHeading">
                            {translate("choose_your_signIn_method_continue")}
                        </div>
                        <div className="BottomHeading">
                            <div>
                                {translate("Do_not_have_an_account")}
                                <span>
                                    <Link to="/signUp"> Create one now</Link>
                                </span>
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
                        socialBtn={socialBtn}
                    />
                </div>
            </div>
        </>
    );
};

export default LoginUI;
