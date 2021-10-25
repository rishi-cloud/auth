import React from "react";
import "./style.css";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";

const Signup = (props) => {
  const { onSubmit, SignupForm, onChange } = props;
  return (
    <div className="formWrapper">
      <form className="InputWrapper">
        <>
          {SignupForm.email !== "" ? (
            <div className="InputLabel">Email</div>
          ) : null}
          <div
            className="InputAndLogo"
            // style={{
            //   border:
            //     LoginError.isEmailError === true
            //       ? "2px solid red"
            //       : LoginError.isEmailError === false
            //       ? "2px solid green"
            //       : "",
            // }}
          >
            <AiOutlineMail
              style={{
                height: "2rem",
                width: "2rem",
                "margin-top": "0.7rem",
                color: "rgb(175, 174, 174)",
              }}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={SignupForm.email}
              placeholder="Email"
              className="Input"
              onChange={onChange}
            />
          </div>
          {SignupForm.password !== "" ? (
            <div className="InputLabelPass">Password</div>
          ) : null}
          <div
            className="InputAndLogo"
            // style={{
            //   border:
            //     LoginError.isEmailError === true
            //       ? "2px solid red"
            //       : LoginError.isEmailError === false
            //       ? "2px solid green"
            //       : "",
            // }}
          >
            <MdLockOutline
              style={{
                height: "2rem",
                width: "2rem",
                "margin-top": "0.7rem",
                color: "rgb(175, 174, 174)",
              }}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={SignupForm.password}
              placeholder="Password"
              className="Input"
              onChange={onChange}
            />
            <AiFillEye
              style={{
                height: "2rem",
                width: "2rem",
                "margin-top": "0.7rem",
                color: "rgb(175, 174, 174)",
              }}
            />
          </div>
          {SignupForm.confirmPassword !== "" ? (
            <div className="InputLabelCPass">Confirm Password</div>
          ) : null}
          <div
            className="InputAndLogo"
            // style={{
            //   border:
            //     LoginError.isEmailError === true
            //       ? "2px solid red"
            //       : LoginError.isEmailError === false
            //       ? "2px solid green"
            //       : "",
            // }}
          >
            <MdLockOutline
              style={{
                height: "2rem",
                width: "2rem",
                "margin-top": "0.7rem",
                color: "rgb(175, 174, 174)",
              }}
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={SignupForm.confirmPassword}
              placeholder="Confirm Password"
              className="Input"
              onChange={onChange}
            />
            <AiFillEye
              style={{
                height: "2rem",
                width: "2rem",
                "margin-top": "0.7rem",
                color: "rgb(175, 174, 174)",
              }}
            />
          </div>
          <div className="PolicyLink">
            By clicking Create my account, you accept{" "}
            <span style={{ color: "rgb(66, 88, 255)" }}>
              McAfee’s License <br />
              Agreement
            </span>{" "}
            and
            <span style={{ color: "rgb(66, 88, 255)" }}> Privacy Notice</span>
          </div>

          {SignupForm.email !== "" &&
          SignupForm.password !== "" &&
          SignupForm.confirmPassword !== "" ? (
            <button className="SubmitButtonActive" onClick={onSubmit}>
              <div>Create My Account</div>
            </button>
          ) : (
            <button className="SubmitButton" onClick={onSubmit}>
              <div>Create My Account</div>
            </button>
          )}
        </>
      </form>
    </div>
  );
};

export default Signup;
