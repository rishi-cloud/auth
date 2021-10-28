import React, { useContext } from "react";
import { AppContext } from "./providers/AppContext";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import ForgotPasswordUI from "./components/ForgotPassword/ForgotPasswordUI";
import ResetPasswordUi from './components/ResetPassword/ResetPasswordUi'

function Main() {
  const { whichPage, setWhichPage } = useContext(AppContext);
  const returnPage = (whichPage) => {
    switch (whichPage) {
      case "signup-page":
        return <Signup setWhichPage={setWhichPage} />
      case "login-page":
        return <Login setWhichPage={setWhichPage} />
      case "forgotPassword-page":
        return <ForgotPasswordUI setWhichPage={setWhichPage} />
      case "resetPassword-page" :
          return <ResetPasswordUi/>
      default:
        return <Login setWhichPage={setWhichPage} />
    }
  };
  return <div>{returnPage(whichPage)}</div>;
}

export default Main;
