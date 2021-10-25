import React, { useContext, useState } from "react";
import { AccountContext } from "../providers/AccountContext";
export default function LoginContainer(props) {
    const { loginWithPassword, otpLogin, otpStart, getSocialLogin } =
        useContext(AccountContext);

    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
        otp: "",
        otpAvailable: false,
        isSubmitting: false,
    });
    const [LoginError, setLoginError] = useState({
        email: "",
        isEmailError: "",
        databaseError: "",
        errorCode: "",
    });
    const [switchLogin, setToggle] = useState(false);

    const [Continue, setContinue] = useState(false);

    const onToggle = () => {
        setToggle(!switchLogin);
        setLoginError({
            ...LoginError,
            email: "",
            databaseError: "",
            errorCode: "",
        });
    };
    const onPressContinue = () => {
        setContinue(true);
    };
    const socialBtn = async (name) => {
        try {
            const res = await getSocialLogin(name);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const onBlur = (e) => {
        switch (e.target.name) {
            case "email":
                if (!e.target.value) {
                    setLoginError({
                        ...LoginError,
                        isEmailError: true,
                        [e.target.name]: "Email is required",
                    });
                } else if (e.target.value && !validateEmail(e.target.value)) {
                    setLoginError({
                        ...LoginError,
                        isEmailError: true,
                        [e.target.name]: "Email is not valid",
                    });
                } else {
                    setLoginError({
                        ...LoginError,
                        isEmailError: false,
                        [e.target.name]: "",
                    });
                }
                break;
            default:
                break;
        }
    };

    const onChange = (e) => {
        setLoginForm({
            ...LoginForm,
            [e.target.name]: e.target.value,
        });
        onBlur(e);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!switchLogin) {
            try {
                const res = await loginWithPassword(
                    LoginForm.email,
                    LoginForm.password
                );
                setLoginError({
                    ...LoginError,
                    databaseError: "",
                });
                console.log(res);
            } catch (err) {
                console.log(err);
                setLoginError({
                    ...LoginError,
                    databaseError: err.description,
                    errorCode: err.code,
                });
            }
        } else {
            try {
                if (LoginForm.otpAvailable) {
                    const res = await otpLogin(LoginForm.email, LoginForm.otp);
                    console.log("---------->", LoginForm.email, LoginForm.otp);
                    console.log(res, "ankit");
                    // } else {
                    //   const res = await otpStart(LoginForm.email);
                    //   console.log("enter here", res);
                    //   setLoginForm({
                    //     ...LoginForm,
                    //     otpAvailable: true,
                    //   });
                }
            } catch (err) {
                console.log(err);
                setLoginError({
                    ...LoginError,
                    databaseError: err.description,
                    errorCode: err.code,
                });
            }
        }
    };
    const getOtp = async () => {
        try {
            setToggle(!switchLogin);
            const res = await otpStart(LoginForm.email);
            console.log("enter here", res);
            setLoginForm({
                ...LoginForm,
                otpAvailable: true,
            });
        } catch (err) {
            console.log(err);
            setLoginError({
                ...LoginError,
                databaseError: err.description,
                errorCode: err.code,
            });
        }
    };

    const child = React.Children.only(props.children);
    return React.cloneElement(child, {
        ...props,
        onChange,
        onToggle,
        switchLogin,
        onSubmit,
        LoginForm,
        LoginError,
        Continue,
        onPressContinue,
        getOtp,
        socialBtn,
    });
}
