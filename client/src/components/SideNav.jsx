import React, { useContext, useEffect, useRef } from "react";
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



const SideNav = () => {
 
  //context
  const AppContext = useContext(app_context);
  const { showSideNav, isSideNavOpen, clpClicked, themeMode, theme, handleSideNav, setClpClicked } = AppContext;

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
            marginTop: "10px",
            marginBottom: "30px",
          },
        },
      },
    },
  });
  

  const sideNavRef = useRef(null);

  // Function to handle clicks outside of the SideNav component


  useEffect(() => {
    const handleOutsideClick = (event) => {
      
      let x = sideNavRef.current && !sideNavRef.current.contains(event.target) && !clpClicked; // false when clicked outside
      if( showSideNav && !clpClicked && x){
        handleSideNav();
      }
      else if(x && clpClicked){
        handleSideNav();
      }
  
     
    };
    // Add event listener for clicks outside of SideNav component
    window.addEventListener("click", handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showSideNav, clpClicked, handleSideNav]);
  return (
    <ThemeProvider theme={myTheme}>
      <Box ref={sideNavRef} 
        sx={({ breakpoints }) => ({
          background: themeMode === "light" ? "linear-gradient(195deg, #42424a, #191919)" : theme.palette.primary.light,
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
            left: (showSideNav ) ? 0 : "-300px",
            transform: (showSideNav ) ? "transformX(0)" : "transformX(-300px)",
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
