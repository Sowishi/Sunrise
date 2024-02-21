import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [uid, setUid] = useState(undefined);
  const [auth, setAuth] = useState(null);
  const [MASTER_NAME, SET_MASTER_NAME] = useState();
  const [SLAVE_NAME, SET_SLAVE_NAME] = useState();

  const updateUid = (newData) => {
    setUid(newData);
  };

  const updateAuth = (newData) => {
    setAuth(newData);
  };

  const updateMasterName = (newData) => {
    SET_MASTER_NAME(newData);
  };

  const updateSlaveName = (newData) => {
    SET_SLAVE_NAME(newData);
  };

  return (
    <MyContext.Provider
      value={{
        uid,
        updateUid,
        auth,
        updateAuth,
        MASTER_NAME,
        SLAVE_NAME,
        updateMasterName,
        updateSlaveName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useSmokeContext = () => {
  return useContext(MyContext);
};
