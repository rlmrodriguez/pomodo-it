import { useState, createContext, useContext } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [allowSound, setAllowSound] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        allowSound,
        setAllowSound,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
