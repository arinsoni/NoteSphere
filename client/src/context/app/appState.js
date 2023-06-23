import AppContext from "./appContext";
import { themeSettings } from '../../theme';
import { useState } from "react";



export const AppState = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [showSideNav, setShowSideNav] = useState(false);
  const [clpClicked, setClpClicked] = useState(false);

  const handleSideNav = () => {
    setClpClicked(true);
    if(showSideNav){
      setShowSideNav(!showSideNav);
    }  else{
      setShowSideNav(!showSideNav)
    }
  }


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
    <AppContext.Provider value={{ theme, toggleTheme, showSideNav,clpClicked, setClpClicked,  setShowSideNav, handleSideNav }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
