import React, { useContext, useState } from "react";
import { AccountContext } from "../providers/AccountContext";

export default function SignupContainer(props) {
    const { SignupWithPassword, loginWithPassword } =
        useContext(AccountContext);

    const [SignupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            SignupForm.email !== "" &&
            SignupForm.password !== "" &&
            SignupForm.confirmPassword !== "" &&
            SignupForm.password === SignupForm.confirmPassword
        ) {
            try {
                const res = await SignupWithPassword(
                    SignupForm.email,
                    SignupForm.password
                );
                console.log(res);
                if (res.email) {
                    await loginWithPassword(
                        SignupForm.email,
                        SignupForm.password
                    );
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("enter details");
        }
    };
    const onChange = (e) => {
        setSignupForm({
            ...SignupForm,
            [e.target.name]: e.target.value,
        });
    };

    const child = React.Children.only(props.children);
    return React.cloneElement(child, {
        onSubmit,
        SignupForm,
        onChange,
    });
}
