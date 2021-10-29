/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Authorize from "./components/Authorize";

import Main from "./Main";

import { AccountProvider } from "./providers/AccountContext";
import LanguageProvider from "./localization/languageProvider";
import { LOCALES } from "./localization/constants";
import { CommonDataProvider } from "./providers/CommonDataContext";
import ResetPassword from './components/ResetPassword/index'

import "./app.css";
import { AppProvider } from "./providers/AppContext";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const App = ({ pageConfig }) => {
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

    return (
        <CommonDataProvider config={pageConfig}>
            <AppProvider>
                <LanguageProvider locale={locale.current}>
                    <AccountProvider config={pageConfig}>
                        <div id="app" className="d-flex flex-column h-100">
                            <div className="container flex-grow-1">
                                <div className="mt-5">
                                    <Switch>
                                        <Route
                                            path="/login"
                                            exact
                                            component={() => <Main />}
                                        />
                                         <Route
                                            path="/reset"
                                            component={() => <ResetPassword />}
                                        />
                                        <Route exact path="/authorize">
                                            <Authorize config={pageConfig} />
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </AccountProvider>
                </LanguageProvider>
            </AppProvider>
        </CommonDataProvider>
    );
};

export default App;
