import AppContext from "./appContext";
import { themeSettings } from "../../theme";
import { useEffect, useState } from "react";
import breakpoints from "../../assets/base/breakpoints";


export const AppState = ({ children }) => {
  //theme
  const [themeMode, setThemeMode] = useState("light");

  //alert
  const [alert, setAlert] = useState(null);
  
  //progress
  const [progress, setProgress] = useState(0);

  //hiding navbar
  const [showNav, setShowNav] = useState(true)


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
    setClpClicked(true);
    if (showSideNav) {
      setShowSideNav(!showSideNav);
    } else {
      setShowSideNav(!showSideNav);
    }
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

  //alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <AppContext.Provider
      value={{
        //theme
        theme,
        toggleTheme,
        //alert
        alert,
        setAlert,
        //progress
        progress, 
        setProgress,
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
        toggleSideNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
