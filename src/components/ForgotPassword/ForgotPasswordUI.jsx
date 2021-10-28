import React, { useState , useContext } from "react";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import { AccountContext } from "../../providers/AccountContext";
import "./style.css";
function ForgotPasswordUI() {
  const [emailDetails, updateEmailDetails] = useState({
    email: "",
    emailError: "",
    databaseMessage: "",
  });

  const { sendForgotPasswordLink } = useContext(AccountContext);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onBlur = (emailVal) => {
    if (!emailVal) {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "Email is required";
        return updatedEmailDetails;
      });
    } else if (emailVal && !validateEmail(emailVal)) {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "Email is not valid";
        return updatedEmailDetails;
      });
    } else {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "";
        return updatedEmailDetails;
      });
    }
  };

  const handleEmailChange = (e) => {
    const emailVal = e.target.value;
    updateEmailDetails((prevEmailDetails) => {
      const updatedEmailDetails = { ...prevEmailDetails };
      updatedEmailDetails.email = emailVal;
      return updatedEmailDetails;
    });
    onBlur(emailVal);
  };
  const handleEmailMe = async(e) => {
    e.preventDefault();
    try
    {
      const res = await sendForgotPasswordLink(emailDetails.email)
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails }
        updatedEmailDetails.databaseMessage = res
        return updatedEmailDetails
      });
    }catch(err){
      console.log(err)
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails }
        updatedEmailDetails.databaseError = err.description
        return updatedEmailDetails
      });

    }
    
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
            Let's reset your password
          </div>
          <div className="ForgotPasswordIntroSubHeading">
            Enter the email you used to create your McAfee account and we’ll send you a link to reset your password.
          </div>
        </div>
      </div>
      <div className="ForgotPasswordRightWrapper">
        <div className="LoginInputContainer">
          {emailDetails.email !== "" ? (
            <div className="LoginInputLabel">{translate("emailAddress")}</div>
          ) : null}
          <div
            style={{
              flex: 1,
              display: "flex",
              border:
                emailDetails.emailError !== ""
                  ? "2px solid red"
                  : emailDetails.emailError === ""
                  ? "2px solid green"
                  : "",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <AiOutlineMail className="LoginInputLogo" />
            <input
              type="email"
              id="email"
              name="email"
              value={emailDetails.email}
              placeholder="Email"
              className="LoginInput"
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {emailDetails.emailError !== "" && (
          <div className="Error">{emailDetails.emailError}</div>
        )}
        <div className="emailMeBtnWrapper">
          <button onClick={handleEmailMe} className="emailMeBtn">
            Email me
          </button>
        </div>
        {emailDetails.databaseMessage !== "" && (
          <div className="Error">{emailDetails.databaseMessage}</div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordUI;
