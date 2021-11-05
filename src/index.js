import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import ResetPassword from './components/ResetPassword/index'

import "./index.css";

// window.LoginWidget = class LoginWidget {
//     init(opts) {
//         const pageConfig = opts.pageConfig;
//         if (!pageConfig) {
//             console.log("hello");
//             throw new Error("pageConfig must be provided in opts");
//         }
//     }
// };

import { BrowserRouter } from "react-router-dom";

window.LoginWidget = class LoginWidget {
  init(opts) {
    const pageConfig = opts.pageConfig;
    if (!pageConfig) {
      throw new Error("pageConfig must be provided in opts");
    }

    ReactDOM.render(
      <BrowserRouter>
        <App pageConfig={pageConfig} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  }
};
window.PasswordResetWidget = class PasswordResetWidget {
  init(opts) {
   console.log("locally: rishi singhal")
   console.log(opts)
   const passwordResetConfig = opts.passwordResetConfig;
   if (!passwordResetConfig) {
     throw new Error("passwordResetConfig must be provided in opts");
   }

    ReactDOM.render(
      <BrowserRouter>
        <App passwordResetConfig={passwordResetConfig} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  }
};

// new window.PasswordResetWidget().init(
//   {
//     passwordResetConfig:{
//       token: "token"
//     }
//   }
// )
// ReactDOM.render(
//   <BrowserRouter>
//     <App pageConfig={{}} />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById("root")
// );
