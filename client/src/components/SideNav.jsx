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

const SideNav = () => {
  //context
  const AppContext = useContext(app_context);
  const { showSideNav, isSideNavOpen, clpClicked } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  const NavItem = ({ label, icon, ...rest }) => {
    const SelectedIcon = icon;
    return (
      <Box
        mt={2.5}
        mr={1}
        ml={1}
        {...rest}
        zIndex="1"
        height="50px"
        display="flex"
        alignItems="center"
        borderRadius="7px"
      >
          <Box
            display="flex"
            width="100%"
            {...rest}
            alignItems="center"
            style={{ margin: "0 auto" }}
          >
            <StyleBox textTransform="capitalize" color="white" paddingTop="0" marginLeft="10px">
              <SelectedIcon style={iconStyle} />
            </StyleBox>
            <StyleBox textTransform="capitalize" color="white" paddingTop="0" marginLeft="10px">
              {label}
            </StyleBox>
  
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
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff, rgba(255, 255, 255, 0))!important",
            height: "0.0625rem",
            borderBottom: "none",
            opacity: "1",
            marginTop: "30px",
            marginBottom: "30px",
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            color: "red",
            "&.css-1s7ud62": {
              color: "red",
              paddingTop: "0",
            },
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
          margin: "20px",
          width: "250px",
          borderRadius: "10px",
          p: "5px",

          [breakpoints.down("lg")]: {
            display:
              isSideNavOpen || (showSideNav && clpClicked)
                ? "block"
                : "none",
          },
          zIndex: "1",
        })}
      >
        <NavItem label="NoteSphere" icon={NoteAltRoundedIcon} />
        <Divider />
        <NavItem label="NoteBoard" icon={DashboardRoundedIcon} pt={-1} />
        <NavItem
          label="Profile"
          icon={PersonRoundedIcon}
          style={{
            background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
          }}
        />
        <NavItem label="About Us" icon={InfoRoundedIcon} />
        <NavItem label="Log Out" icon={LogoutRoundedIcon} />
      </Box>
    </ThemeProvider>
  );
};

export default SideNav;
