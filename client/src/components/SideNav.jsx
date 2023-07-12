import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//My components
import StyleBox from "../pages/Profile/components/StyleBox";

// Mui Componenets
import { Box, Divider, ThemeProvider, createTheme } from "@mui/material";
//icons
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';


//context
import app_context from "../context/app/appContext";
import user_conetxt from "../context/user/userContext";

const SideNav = () => {
  const navigate = useNavigate();
  //context
  const AppContext = useContext(app_context);
  const {
    showSideNav,
    isSideNavOpen,
    clpClicked,
    themeMode,
    theme,
    handleSideNav,
    setProgress,
    count,
  } = AppContext;

  const UserContext = useContext(user_conetxt);
  const { user, setIsLogin, isLogin } = UserContext;

  //user credentials
  const [id, setId] = useState(null);

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };


  const NavItem = ({ label, icon, redirectTo, active, onClick, ...rest }) => {
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
          background: active
            ? "linear-gradient(195deg, #49a3f1, #1A73E8)"
            : "transparent",
        }}
      >
        <Link
          to={redirectTo}
          style={{
            textDecoration: "none",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onClick}
        >
          <Box display="flex" alignItems="center" marginLeft="10px">
            <StyleBox
              textTransform="capitalize"
              color="white"
              paddingTop="0"
              marginRight="10px"
            >
              <SelectedIcon style={iconStyle} />
            </StyleBox>

            <StyleBox textTransform="capitalize" color="white" paddingTop="0">
              {label}
            </StyleBox>
          </Box>
        </Link>
      </Box>
    );
  };
  // // divider style
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
      let x =
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target) &&
        !clpClicked; // false when clicked outside
      if (showSideNav && !clpClicked && x) {
        handleSideNav();
      } else if (x && clpClicked) {
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

  // BACKEND INTEGRATION

  //getting user
  useEffect(() => {
    if (user && user._id) {
      setId(user._id);
    }
  }, [user]);

  const handleLogout = () => {
    setProgress(50);
    localStorage.removeItem("token");
    setProgress(100);
    navigate("/login");
    setProgress(100);
    setIsLogin(false);
  };
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        ref={sideNavRef}
        sx={({ breakpoints }) => ({
          background:
            themeMode === "light"
              ? "linear-gradient(195deg, #42424a, #191919)"
              : "#1f283e",
          position: "fixed",
          top: 0,
          left: isSideNavOpen ? 0 : "-300px",
          transform: isSideNavOpen ? "transformX(0)" : "transformX(-300px)",
          transition: "left 0.3s ease-out",
          bottom: 0,
          margin: "20px",
          width: "250px",
          borderRadius: "10px",
          border: `1px solid ${theme.palette.font.dark}`,
          p: "5px",

          [breakpoints.down("md")]: {
            left: showSideNav ? 0 : "-300px",
            transform: showSideNav ? "transformX(0)" : "transformX(-300px)",
            transition: "left 0.3s ease-out",
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
          redirectTo={ isLogin &&  `/${id}/noteboard` }
          active={window.location.pathname === `/${id}/noteboard`}
        />
        <NavItem
          label="Dashboard"
          icon={PersonRoundedIcon}
          redirectTo={`/`}
          active={window.location.pathname === `/`}
        />
        {/* <NavItem
          label="About Us"
          icon={InfoRoundedIcon}
          redirectTo={`/${id}/dashboard/${1}`}
          active={window.location.pathname === `/${id}/dashboard/${1}`}
        /> */}
        {!isLogin && (
          <>
            <NavItem
              label="Log In"
              icon={LoginRoundedIcon}
              active={false}
              redirectTo="/login"
            />

            <NavItem
              label="Sign-Up"
              icon={AppRegistrationRoundedIcon}
              active={false}
              redirectTo="/signup"
            />
          </>
        )}
        {isLogin && (
          <NavItem
            label="Log Out"
            icon={LogoutRoundedIcon}
            active={false}
            onClick={handleLogout}
            redirectTo="/login"
          />
        )}
        <div>{count}</div>
      </Box>
    </ThemeProvider>
  );
};

export default SideNav;
