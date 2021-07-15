import React, { useContext, useState, createContext } from "react";
import ItensGrid from "../components/ItensGrid";
const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  //declare variables
  const [selectedCategory, setSelectedCategory] = useState("Playlists");
  const [selectedItem, setSelectedItem] = useState();
  const [component, setComponent] = useState(<ItensGrid />);
  return (
    <GlobalStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedItem,
        setSelectedItem,
        component,
        setComponent,
      }}
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
