import React, { useContext } from "react";
import { AppContext } from "./providers/AppContext";
import Login from "./components/login/index";
import Signup from "./components/signup/index";

function Main() {
    const { whichPage, setWhichPage } = useContext(AppContext);
    return (
        <div>
            {whichPage === "signup-page" ? (
                <Signup setWhichPage={setWhichPage} />
            ) : (
                <Login setWhichPage={setWhichPage} />
            )}
        </div>
    );
}

export default Main;
