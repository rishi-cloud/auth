import React, { useContext, useState } from "react";
import { AccountContext } from "../providers/AccountContext";
import { CommonDataContext } from "../providers/CommonDataContext";
import { validatePassword } from "../validator/PasswordValidator";

export default function SignupContainer(props) {
  const { SignupWithPassword, loginWithPassword } = useContext(AccountContext);
  const { connections } = useContext(CommonDataContext);

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
          const loginResponse = await loginWithPassword(
            SignupForm.email,
            SignupForm.password
          );
        }
      } catch (e) {
        setSignupError({
          ...SignupError,
          databaseError: e.description,
          errorCode: e.code,
        });
      }
    } else {
      console.log("enter details");
    }
  };

  const onClick = (e) => {
    setPasswordRules(connections[0]);
  };
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

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
  });
}
