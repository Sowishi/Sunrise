import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [smoke, setData] = useState(false);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ smoke, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
