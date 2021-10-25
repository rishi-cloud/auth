import React from "react";
import Signup from "./Signup";
import "./style.css";
import { Link } from "react-router-dom";

const SignupUI = (props) => {
    const { onSubmit, SignupForm, onChange } = props;
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
                    <hr className="hr"></hr>
                    <div className="IntroSubHeading">
                        <div className="PointsHeading">Step 1</div>
                        <div className="Points">
                            Enter your email address so we can find your
                            account.
                        </div>
                    </div>
                    <div className="IntroSubHeading">
                        <div className="PointsHeading">Step 2</div>
                        <div className="Points">
                            Set a password and we’ll create your account.
                        </div>
                    </div>
                </div>
                <div className="RightContainer">
                    <Signup
                        onChange={onChange}
                        onSubmit={onSubmit}
                        SignupForm={SignupForm}
                    ></Signup>
                </div>
            </div>
        </>
    );
};

export default SignupUI;
