import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [smoke, setData] = useState(false);
  const [uid, setUid] = useState(23);

  const updateData = (newData) => {
    setData(newData);
  };

  const updateUid = (newData) => {
    setUid(newData);
  };

  return (
    <MyContext.Provider value={{ smoke, updateData, uid, updateUid }}>
      {children}
    </MyContext.Provider>
  );
};

export const useSmokeContext = () => {
  return useContext(MyContext);
};
