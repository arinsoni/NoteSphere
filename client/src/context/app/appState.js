import AppContext from "./appContext";
import { themeSettings } from "../../theme";
import { useEffect, useState } from "react";
import breakpoints from "../../assets/base/breakpoints";


export const AppState = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [showSideNav, setShowSideNav] = useState(false);
  const [clpClicked, setClpClicked] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < breakpoints.values.lg;
      setIsSideNavOpen(!isSmallScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSideNav = () => {
    setClpClicked(true);
    if (showSideNav) {
      setShowSideNav(!showSideNav);
    } else {
      setShowSideNav(!showSideNav);
    }
  };
  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      document.body.style.backgroundColor = "#1a2035";
    } else {
      setThemeMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const theme = themeSettings(themeMode);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        showSideNav,
        clpClicked,
        setClpClicked,
        setShowSideNav,
        handleSideNav,
        isSideNavOpen,
        setIsSideNavOpen,
        toggleSideNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
