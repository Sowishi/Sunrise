import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [uid, setUid] = useState(undefined);
  const [auth, setAuth] = useState(null);

  const updateUid = (newData) => {
    setUid(newData);
  };

  const updateAuth = (newData) => {
    setAuth(newData);
  };

  return (
    <MyContext.Provider value={{ uid, updateUid, auth, updateAuth }}>
      {children}
    </MyContext.Provider>
  );
};

export const useSmokeContext = () => {
  return useContext(MyContext);
};
