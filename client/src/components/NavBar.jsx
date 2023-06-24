import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Mui Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

//comtext
import app_context from "../context/app/appContext";
import StyleBox from "../pages/Profile/components/StyleBox";
import { Icon, IconButton } from "@mui/material";

const NavBar = () => {
  //context
  const AppContext = useContext(app_context);
  const {
    isSideNavOpen,
    theme,
    showSideNav,
    handleSideNav,
    setClpClicked,
    themeMode,
  } = AppContext;

  // color of navbar
  const [navColor, setNavColor] = useState("transparent");
  const [navShadow, setNavShadow] = useState("none");
  const [navOpacity, setNavOpacity] = useState("1");

  //handle scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      themeMode === "light"
        ? setNavColor("white")
        : setNavColor("rgba(26, 32, 53, 0.8)");
      themeMode === "light"
        ? setNavShadow("none")
        : setNavShadow(
            "inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9), 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)"
          );

      setNavOpacity("0.9");
    } else {
      setNavColor("transparent");
      themeMode === "light" ? setNavShadow("none") : setNavShadow("none");
      setNavOpacity("1");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  useEffect(() => {
    handleScroll();
  }, [themeMode]);

  const handleSideNavbar = async () => {
    await handleSideNav();
    setClpClicked(true);
  };

  return (
    <Box
      sx={{
        height: "max-content", // cover only child's height
        flexGrow: 1,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: isSideNavOpen ? "280px" : 0,
        margin: "9px",
      }}
    >
      <AppBar
        position="static"
        style={{
          borderRadius: "10px",
          backgroundColor: navColor,
          boxShadow: navShadow,

          opacity: navOpacity,
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box display="flex" flexDirection="column">
              <StyleBox
                sx={{
                  paddingTop: "0",
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.font.main,
                  fontSize: theme.typography.para.fontSize,
                }}
              >
                <HomeRoundedIcon style={{ height: "17px" }} />
                &nbsp; / &nbsp; Home
              </StyleBox>
              <StyleBox
                sx={{
                  paddingTop: "5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  color: theme.palette.font.main,
                  fontWeight: theme.typography.subHeading.fontWeight,
                  ml: "4px",
                }}
              >
                Profile
              </StyleBox>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ zIndex: "2" }}>
            <StyleBox
              sx={{
                paddingTop: "0",
                display: "flex",
                alignItems: "center",
                color: "white",
                display: !isSideNavOpen ? "block" : "none",
                paddingRight: "2px",
              }}
            >
              <IconButton onClick={handleSideNavbar}>
                {!showSideNav ? (
                  <MenuRoundedIcon style={{ height: "23px", color: "white" }} />
                ) : (
                  <MenuOpenRoundedIcon style={{ height: "23px", color: "white" }} />
                )}
              </IconButton>
            </StyleBox>
          </Box>

          <Box display="flex" flexDirection="column">
            <StyleBox
              sx={{
                paddingTop: "0",
                display: "flex",
                alignItems: "center",
                color: theme.palette.font.main,
              }}
            >
              <PersonRoundedIcon style={{ height: "20px" }} />
            </StyleBox>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
