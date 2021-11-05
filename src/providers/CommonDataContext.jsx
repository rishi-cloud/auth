/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

const CommonDataContext = React.createContext({});

const CommonDataProvider = (props) => {
  const [connections, setConn] = useState([]);
  const [passwordResetConfig, setPasswordResetConfig] = useState({})
  useEffect(() => {
    if(props.config){
       console.log('config is available in commom data provider')
       const getCommonData = async () => {
        const res = await axios.get(
          `https://${props.config.auth0Domain}/client/${props.config.clientID}.js`
        );
        const data = res.data;
        if (typeof data === "string") {
          const filteredData = data.slice(16, -2);
          const jsonData = JSON.parse(filteredData);
          const DB_ARRAY = jsonData?.strategies[0]?.connections.filter(
            (item) => item.name === "Test-CustomDB"
          );
          console.log("DB ARRAY RECIVED", DB_ARRAY);
          setConn(DB_ARRAY);
        }
      };
      getCommonData();
    }
    if(props.passwordResetConfig){
      console.log('password reset config is available',props.passwordResetConfig)
      setPasswordResetConfig(props.passwordResetConfig)

    }
   
  }, []);
  return (
    <CommonDataContext.Provider value={{ connections, passwordResetConfig }}>
      {props.children}
    </CommonDataContext.Provider>
  );
};

export { CommonDataProvider, CommonDataContext };
