import React, { useContext, useEffect, useState } from "react";

// Mui Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

//comtext
import app_context from "../context/app/appContext";
import StyleBox from "../pages/Profile/components/StyleBox";

const NavBar = () => {
  //context
  const AppContext = useContext(app_context);
  const { isSideNavOpen, theme } = AppContext;

  // color of navbar
  const [navColor, setNavColor] = useState("transparent");
  const [navOpacity, setNavOpacity] = useState("1");
  //handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavColor("white");
        setNavOpacity("0.9")
      } else {
        setNavColor("transparent");
        setNavOpacity("1")
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(navColor);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  return (
    <Box
      sx={{
        height: "max-content", // cover only child's height
        flexGrow: 1,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: isSideNavOpen ? "300px" : 0,
        margin: "9px",
        zIndex: "2",
      }}
    >
      <AppBar
        position="static"
        style={{
          borderRadius: "10px",
          backgroundColor: navColor,
          boxShadow: "none",
          border: "none",
          opacity: navOpacity
        }}
      >
        <Toolbar>
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
                ml:"4px"
              }}
            >
              Profile
            </StyleBox>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
