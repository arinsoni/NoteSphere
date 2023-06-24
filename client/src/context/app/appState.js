import AppContext from "./appContext";
import { themeSettings } from "../../theme";
import { useEffect, useState } from "react";
import breakpoints from "../../assets/base/breakpoints";


export const AppState = ({ children }) => {
  //theme
  const [themeMode, setThemeMode] = useState("light");
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
        toggleSideNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
