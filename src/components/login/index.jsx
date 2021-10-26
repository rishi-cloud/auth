import React, { useEffect } from "react";
import LoginContainer from "../../containers/loginContainer";
import LoginUI from "./loginUi";

const Login = (props) => {
  useEffect(() => {
    let utag_data = window.utag_data;
    let utag = window.utag;
    utag.view({ ...utag_data, tm_global_pagename: "Login-React" });
  }, []);
  return (
    <LoginContainer {...props}>
      <LoginUI />
    </LoginContainer>
  );
};
export default Login;
