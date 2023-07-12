import AppContext from "./appContext";
import { themeSettings } from "../../theme";
import { useEffect, useState } from "react";
import breakpoints from "../../assets/base/breakpoints";

const AppState = ({ children }) => {
  //theme
  const [themeMode, setThemeMode] = useState("light");

  //hiding navbar
  const [showNav, setShowNav] = useState(false);

  //progress
  const [progress, setProgress] = useState(0);

  //Alert
  const [alert, setAlert] = useState(null);

  // tabs
  const [value, setValue] = useState(0);
  const showAlert = (index, message) => {
    setAlert({
      index: index,
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  //sidenav
  //showSideNav when button clicked on navbar
  const [showSideNav, setShowSideNav] = useState(false);
  // is btn clicked on navbar for sidenav
  const [clpClicked, setClpClicked] = useState(false);
  //visibility on the basis of size
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  //sidenav
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
    if (showSideNav) {
      setShowSideNav(!showSideNav);
    } else {
      setShowSideNav(!showSideNav);
    }
    setTimeout(() => {
      setClpClicked(false);
    }, 100);
  };

  //sidenav

  //theme
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
  //theme

  return (
    <AppContext.Provider
      value={{
        //theme
        theme,
        themeMode,
        toggleTheme,
        //navbar
        showNav,
        setShowNav,
        //sidenav
        showSideNav,
        clpClicked,
        setClpClicked,
        setShowSideNav,
        handleSideNav,
        isSideNavOpen,
        setIsSideNavOpen,
        toggleSideNav,
        //alert
        showAlert,
        alert,
        setAlert,
        //progress
        progress, 
        setProgress,
        //tabs
        value,
        setValue
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
