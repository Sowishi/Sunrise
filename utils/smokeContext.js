import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [smoke, setData] = useState(false);
  const [uid, setUid] = useState(undefined);
  const [auth, setAuth] = useState(null);

  const updateData = (newData) => {
    setData(newData);
  };

  const updateUid = (newData) => {
    setUid(newData);
  };

  const updateAuth = (newData) => {
    setAuth(newData);
  };

  return (
    <MyContext.Provider
      value={{ smoke, updateData, uid, updateUid, auth, updateAuth }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useSmokeContext = () => {
  return useContext(MyContext);
};
