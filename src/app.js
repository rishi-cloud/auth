/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { Home, Profile, ExternalApi } from "./views";
import ProtectedRoute from "./auth/protected-route";
import Authorize from "./components/Authorize";
import DashBoard from "./components/dashboard";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import { AccountProvider } from "./providers/AccountContext";
import LanguageProvider from "./localization/languageProvider";
import { LOCALES } from "./localization/constants";
import { CommonDataProvider } from "./providers/CommonDataContext";

import "./app.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const App = ({ pageConfig }) => {
    console.log("Bundle is working fine");
    const parsedHash = new URLSearchParams(window.location.hash.substr(1));
    if (useLocation().pathname === "/login") {
        sessionStorage.setItem("params", useLocation().search);
    }

    let query = useQuery();
    let locale = useRef("");
    let lang;
    let culture = query.get("culture") ?? parsedHash.get("culture");

    if (culture === null) {
        if (localStorage.getItem("lang") === null) {
            lang = "en-us";
        } else {
            lang = localStorage.getItem("lang");
        }
    } else {
        lang = culture;
        localStorage.setItem("lang", lang);
    }

    if (lang === "en-us") {
        locale.current = LOCALES.ENGLISH;
    } else if (lang === "fr-ca") {
        locale.current = LOCALES.FRENCH;
    } else {
        locale.current = "en-us";
    }
    window.addEventListener("beforeunload", function (e) {
        console.log("ankit=====");
        e.preventDefault();
        return (
            <Redirect
                to={`/login${sessionStorage.getItem("search")}`}
            ></Redirect>
        );
    });

    return (
        <CommonDataProvider>
            <LanguageProvider locale={locale.current}>
                <AccountProvider config={pageConfig}>
                    <div id="app" className="d-flex flex-column h-100">
                        <div className="container flex-grow-1">
                            <div className="mt-5">
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route
                                        path="/login"
                                        exact
                                        component={() => (
                                            <Login pageConfig={pageConfig} />
                                        )}
                                    />
                                    <Route
                                        path="/signUp"
                                        exact
                                        component={Signup}
                                    />
                                    <Route exact path="/authorize">
                                        <Authorize config={pageConfig} />
                                    </Route>
                                    <Route
                                        exact
                                        path="/dashboard"
                                        component={DashBoard}
                                    />
                                    <ProtectedRoute
                                        path="/profile"
                                        component={Profile}
                                    />
                                    <ProtectedRoute
                                        path="/external-api"
                                        component={ExternalApi}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </AccountProvider>
            </LanguageProvider>
        </CommonDataProvider>
    );
};

export default App;
