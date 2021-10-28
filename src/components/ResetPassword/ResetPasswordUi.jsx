import React , {useContext,useState }from 'react'
import { MdLockOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import Rules from "../../utils/Rules";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";
import translate from "../../localization/translate";
import { CommonDataContext } from "../../providers/CommonDataContext";
import { validatePassword } from "../../validator/PasswordValidator";
import './style.css'

function ResetPasswordUi() {
    const { connections } = useContext(CommonDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [displayRules, setDisplayRules] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [passwordRules, setPasswordRules] = useState(null);
    const [SignupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [PasswordPolicyState, setPasswordPolicyState] = useState({
        No_more_than_2_identical_characters_in_a_row: false,
        Special_characters: false,
        Lower_case_Upper_Case_Numbers: false,
        Length_Check: false,
        Non_empty_Password_Required: false,
    });
    const [SignupError, setSignupError] = useState({
        email: "",
        isEmailError: "",
        databaseError: "",
        errorCode: "",
    });
    const onChange = (e) => {
        if (e.target.name === "password" && passwordRules) {
            validatePassword(
                passwordRules,
                e.target.value,
                PasswordPolicyState,
                setPasswordPolicyState,
                setIsValid
            );
        }
        setSignupForm({
            ...SignupForm,
            [e.target.name]: e.target.value,
        });
    };

    const ruleMap =
        passwordRules &&
        Rules({
            count: passwordRules?.password_complexity_options?.min_length,
        });
    const displayablerule = [];
    const getKeys = [];
    if (passwordRules?.passwordPolicy === "good") {
        for (const key of Object.keys(PasswordPolicyState)) {
            if (key !== "No_more_than_2_identical_characters_in_a_row") {
                getKeys.push(key);
                displayablerule.push(ruleMap[key]);
            }
        }
    } else if (passwordRules?.passwordPolicy === "excellent") {
        for (const key of Object.keys(PasswordPolicyState)) {
            getKeys.push(key);
            displayablerule.push(ruleMap[key]);
        }
    } else if (passwordRules?.passwordPolicy === "fair") {
        for (const key of Object.keys(PasswordPolicyState)) {
            if (
                key !== "No_more_than_2_identical_characters_in_a_row" ||
                key !== "Special_characters"
            ) {
                getKeys.push(key);
                displayablerule.push(ruleMap[key]);
            }
        }
    } else if (passwordRules?.passwordPolicy === "low") {
        for (const key of Object.keys(PasswordPolicyState)) {
            if (
                key !== "No_more_than_2_identical_characters_in_a_row" ||
                key !== "Special_characters" ||
                key !== "Lower_case_Upper_Case_Numbers"
            ) {
                getKeys.push(key);
                displayablerule.push(ruleMap[key]);
            }
        }
    } else if (passwordRules?.passwordPolicy === null) {
        for (const key of Object.keys(PasswordPolicyState)) {
            if (key === "Non_empty_Password_Required") {
                getKeys.push(key);
                displayablerule.push(ruleMap[key]);
            }
        }
    }
    const onClick = (e) => {
        setPasswordRules(connections[0]);
    };

    return (
        <div className="ForgotPasswordContainer">
      <div className="ForgotPasswordLeftWrapper">
        <div className="LoginWelcomeContainer">
          <img
            alt="McAfeeLogo"
            className="McAfeeLogo"
            src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
          />
          <div className="ForgotPasswordIntro">
            Reset Password
          </div>
          <div className="ForgotPasswordIntroSubHeading">
          Enter and confirm your new password for janedoe@gmail.com.
          </div>
        </div>
      </div>
      <div className="ForgotPasswordRightWrapper">
      <div className="formWrapper">
            <form className="InputWrapper">
            <>
            <div>
                        {SignupForm.password !== "" ? (
                            <div
                                className="InputLabelPass"
                                style={{
                                    color: isValid
                                        ? "#0CA77D"
                                        : "rgb(175, 174, 174)",
                                }}
                            >
                                {translate("password")}
                            </div>
                        ) : null}
                        <div
                            className="InputAndLogoSignup"
                            // style={{
                            //   border:
                            //     LoginError.isEmailError === true
                            //       ? "2px solid red"
                            //       : LoginError.isEmailError === false
                            //       ? "2px solid green"
                            //       : "",
                            // }}
                            style={{
                                border: `1px solid ${
                                    isValid ? "#0CA77D" : "RGB(212, 213, 219)"
                                }`,
                            }}
                        >
                            <MdLockOutline
                                style={{
                                    height: "2rem",
                                    width: "2rem",
                                    marginTop: "0.5rem",
                                    color: "rgb(175, 174, 174)",
                                }}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={SignupForm.password}
                                placeholder="Password"
                                className="Input"
                                onChange={onChange}
                                onFocus={() => {
                                    onClick();
                                    setDisplayRules(true);
                                }}
                                onBlur={() => setDisplayRules(false)}
                            />
                            <AiFillEye
                                style={{
                                    height: "2rem",
                                    width: "2rem",
                                    marginTop: "0.5rem",
                                    color: "rgb(175, 174, 174)",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    showPassword
                                        ? setShowPassword(false)
                                        : setShowPassword(true);
                                }}
                            />
                            {isValid ? (
                                <TickIcon
                                    style={{
                                        height: "2rem",
                                        width: "2rem",
                                        marginTop: "0.5rem",
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div>
                        {displayRules ? (
                            <>
                                <div className="Password-rules">
                                    {displayablerule.map((item, index) => {
                                        return (
                                            <div className="Rule">
                                                {" "}
                                                <div className="checkbox">
                                                    {PasswordPolicyState[
                                                        getKeys[index]
                                                    ] ? (
                                                        <TiTick className="tick" />
                                                    ) : (
                                                        <MdOutlineCancel className="cancel" />
                                                    )}
                                                </div>
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            console.log("not going inside that")
                        )}
                    </div>
                    <div>
                        {SignupForm.confirmPassword !== "" ? (
                            <div
                                className="InputLabelCPass"
                                style={{
                                    color:
                                        SignupForm.password ===
                                            SignupForm.confirmPassword &&
                                        SignupForm.confirmPassword !== ""
                                            ? "#0CA77D"
                                            : "rgb(175, 174, 174)",
                                }}
                            >
                                {translate("confirm_password")}
                            </div>
                        ) : null}
                        <div
                            className="InputAndLogoSignup"
                            // style={{
                            //   border:
                            //     LoginError.isEmailError === true
                            //       ? "2px solid red"
                            //       : LoginError.isEmailError === false
                            //       ? "2px solid green"
                            //       : "",
                            // }}
                            style={{
                                border: `1px solid ${
                                    SignupForm.password ===
                                        SignupForm.confirmPassword &&
                                    SignupForm.confirmPassword !== ""
                                        ? "#0CA77D"
                                        : "RGB(212, 213, 219)"
                                }`,
                            }}
                        >
                            <MdLockOutline
                                style={{
                                    height: "2rem",
                                    width: "2rem",
                                    marginTop: "0.5rem",
                                    color: "rgb(175, 174, 174)",
                                }}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={SignupForm.confirmPassword}
                                placeholder="Confirm Password"
                                className="Input"
                                onChange={onChange}
                                onBlur={() => setDisplayRules(false)}
                            />
                            <AiFillEye
                                style={{
                                    height: "2rem",
                                    width: "2rem",
                                    marginTop: "0.7rem",
                                    color: "rgb(175, 174, 174)",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    showPassword
                                        ? setShowPassword(false)
                                        : setShowPassword(true);
                                }}
                            />
                            {SignupForm.password ===
                                SignupForm.confirmPassword &&
                            SignupForm.confirmPassword !== "" ? (
                                <TickIcon
                                    style={{
                                        height: "2rem",
                                        width: "2rem",
                                        marginTop: "0.5rem",
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                    {SignupError.errorCode && (
                        <div className="Error">
                            {translate(SignupError.errorCode)}
                        </div>
                    )}
                     </>
            </form>
        </div>
      </div>
        </div>
    )
}

export default ResetPasswordUi
