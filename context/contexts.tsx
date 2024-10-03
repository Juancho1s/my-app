import React, { createContext, useState, useContext } from "react";

// Create a Context for the number
const GlobalContext = createContext({});

// Create a provider component
export const GlobalProvider = ({ children }: any) => {
  const [number, setNumber] = useState(0); // Use this state to store your number
  const [theme, setTheme] = useState("light"); // Use this state to store your value

  return (
    <GlobalContext.Provider value={{ number, setNumber, theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalProvider = () => useContext(GlobalContext)
