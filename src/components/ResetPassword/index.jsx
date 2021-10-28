import React, { useContext, useEffect } from "react";
import { AppContext } from "../../providers/AppContext";
import Main from '../../Main'

function ResetPassword() {
  const { setWhichPage } = useContext(AppContext);
  useEffect(() => {
    setWhichPage("resetPassword-page");
    console.log("IM SETTING RESET PAGE")
  }, []);
  return <Main/>;
}

export default ResetPassword;
