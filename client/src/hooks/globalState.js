import React, { useContext, useState, createContext } from "react";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  //declare variables
  return (
    <GlobalStateContext.Provider
      value={
        {
          //return variables
        }
      }
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
}
