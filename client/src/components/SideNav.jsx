import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

//assets
import breakpoints from "../assets/base/breakpoints";


const SideNav = () => {
 
  //context
  const AppContext = useContext(app_context);
  const { showSideNav, isSideNavOpen, clpClicked } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  const NavItem = ({ label, icon, redirectTo, active, ...rest }) => {
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
        sx={{
          background: active ? "linear-gradient(195deg, #49a3f1, #1A73E8)" : "transparent",
        }}
        
        
      >
        <Link to={redirectTo} style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            
            {...rest}
            alignItems="center"
            style={{ margin: "0 auto" }}
          >
            <StyleBox
              textTransform="capitalize"
              color="white"
              paddingTop="0"
              marginLeft="10px"
            >
              <SelectedIcon style={iconStyle} />
            </StyleBox>

            <StyleBox
              textTransform="capitalize"
              color="white"
              paddingTop="0"
              marginLeft="10px"
            >
              {label}
            </StyleBox>
          </Box>
        </Link>
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
          left: isSideNavOpen ? 0 : "-300px",
          transform: isSideNavOpen ? "transformX(0)" : "transformX(-300px)",
          transition : "left 0.3s ease-out",
          bottom: 0,
          margin: "20px",
          width: "250px",
          borderRadius: "10px",
          p: "5px",

          [breakpoints.down("md")]: {
            left: (showSideNav && clpClicked) ? 0 : "-300px",
            transform: (showSideNav && clpClicked) ? "transformX(0)" : "transformX(-300px)",
            transition : "left 0.3s ease-out",
          },
          zIndex: "1",
        })}
      >
        <NavItem label="NoteSphere" icon={NoteAltRoundedIcon} />
        <Divider />
        <NavItem
          label="NoteBoard"
          icon={DashboardRoundedIcon}
          pt={-1}
          redirectTo="/noteboard"
          active={window.location.pathname === "/noteboard"}
        />
        <NavItem
          label="Profile"
          icon={PersonRoundedIcon}
          redirectTo="/dashboard"
          active={window.location.pathname === "/dashboard"}
          
        />
        <NavItem
          label="About Us"
          icon={InfoRoundedIcon}
          redirectTo="/"
          active={window.location.pathname === "/"}
          
        />
        <NavItem label="Log Out" icon={LogoutRoundedIcon} active={false} />
      </Box>
    </ThemeProvider>
  );
};

export default SideNav;
