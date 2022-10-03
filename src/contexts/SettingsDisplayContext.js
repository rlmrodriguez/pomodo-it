import { useState, createContext, useContext } from "react";

const SettingsDisplayContext = createContext();

export const useDisplay = () => {
  return useContext(SettingsDisplayContext);
};

export const DisplayProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SettingsDisplayContext.Provider
      value={{
        showSettings,
        setShowSettings,
      }}
    >
      {children}
    </SettingsDisplayContext.Provider>
  );
};
