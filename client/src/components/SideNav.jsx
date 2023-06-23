import React, { useContext, useEffect } from "react";

//My components
import StyleBox from "../pages/Profile/components/StyleBox";

// Mui Componenets
import { Box, Divider, ThemeProvider, createTheme } from "@mui/material";
//icons
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

//theme
import app_context from "../context/app/appContext";
import breakpoints from "../assets/base/breakpoints";

const SideNav = (props) => {
  //props

  console.log("sidenav: " + props.showSideNav);

  //context
  const AppContext = useContext(app_context);
  const { clpClicked } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  const NavItem = ({ label, icon, ...rest }) => {
    const SelectedIcon = icon;
    return (
      <Box pr={2} pl={2} {...rest} zIndex="1">
        <Box display="flex" justifyContent="space-between" {...rest}>
          <StyleBox textTransform="capitalize" color="white">
            <SelectedIcon style={iconStyle} />
          </StyleBox>
          <StyleBox textTransform="capitalize" color="white" >{label}</StyleBox>
        </Box>
      </Box>
    );
  };
  //  // divider style
  const myTheme = createTheme({
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
           
            height: "0.0625rem",
            borderBottom: "none",
            opacity: "1",
            marginTop: "20px",
            marginBottom: "20px"
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        sx={({ breakpoints }) => ({
          background: "linear-gradient(195deg, #42424a, #191919)",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          margin: "2%",
          width: "250px",
          borderRadius: "10px",
          p: "2px",

          [breakpoints.down("lg")]: {
            display: (props.isSideNavOpen || (props.showSideNav && clpClicked)) ? "block" :  "none" 
          },
          zIndex: "1",
        })}
      >
        <NavItem label="NoteSphere" icon={NoteAltRoundedIcon} />
        <Divider />
        <NavItem label="NoteBoard" icon={DashboardRoundedIcon} />
        <NavItem label="Profile" icon={PersonRoundedIcon} />
        <NavItem label="About Us" icon={InfoRoundedIcon} />
        <NavItem label="Log Out" icon={LogoutRoundedIcon} />
      </Box>
    </ThemeProvider>
  );
};

export default SideNav;
