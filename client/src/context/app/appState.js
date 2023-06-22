import AppContext from "./appContext";
import { themeSettings } from '../../theme';
import { useState } from "react";



export const AppState = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      document.body.style.backgroundColor = '#1a2035';
    }
    else {
      setThemeMode('light');
      document.body.style.backgroundColor = 'white';
    }

  }
  const theme = themeSettings(themeMode); 

  

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
