import React, { useContext, useEffect, useState } from "react";

// My Components
import MyBox from "../../components/MyBox";

// Material UI components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Divider } from "@mui/material";

// Profile Components
import AccountSettings from "./components/AccountSettings";
import ProfileInfoCard from "./components/ProfileInfoCard";
import AdditionalFeatures from "./components/AdditionalFeatures";

// My assets
import dp from "../../assets/images/dp.jpeg";
import bg from "../../assets/images/bg.jpg";
import breakpoints from "../../assets/base/breakpoints";

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

//theme
import app_context from "../../context/app/appContext";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  //navigation
  let navigate = useNavigate();
  //context
  const AppContext = useContext(app_context);
  const { theme, toggleTheme } = AppContext;
  // hide Navbar
  useEffect(() => {
    props.setShowNav(false);
    return () => {
      props.setShowNav(true);
    };
  }, [props]);

  // tabs
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  // divider
  const [showDivider, setShowDivider] = useState(true);
  useEffect(() => {
    const handleTabsOrientation = () => {
      if (window.innerWidth < breakpoints.values.sm) {
        setTabsOrientation("vertical");
        setShowDivider(false);
      } else {
        setTabsOrientation("horizontal");
        setShowDivider(true);
      }
    };

    // event that calling the handleTabsOrientation
    window.addEventListener("resize", handleTabsOrientation);

    // calling handleTabsOrientation to set the state in initial value
    handleTabsOrientation();

    // removing event listener on unmounting
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation, showDivider]);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  // tab style
  let tabStyle = {
    color: theme.palette.font.main,
    opacity: 1,
    fontFamily: theme.typography.h6.fontFamily,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
  };
  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  //styels

  const myStyle = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "25px",
            borderRadius: "8px",
            height: "30px",
            backgroundColor: "transparent",
            opacity: "1",
            margin: "4px",
            "&.Mui-selected": {
              backgroundColor: theme.palette.secondary.main,
              transition: "background-color 0s ease-in-out ",
              color: theme.palette.font.main,
            },
          },
        },
      },
      MuiDivider:{
        styleOverrides:{
          root:{
            opacity: "0.5",
          }
        }
      },
    },
  });

  // change body bg

  return (
    <ThemeProvider theme={myStyle}>
      <MyBox
        width="100%"
        height="400px"
        display="flex"
        alignItems="center" // Optional: Adjust the alignment of the content vertically
        justifyContent="center" // Optional: Adjust the alignment of the content horizontally
        position="relative"
        borderRadius="15px" // Set the border radius value here
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover", // to cover the given area
          backgroundPosition: "center", // to show image completely
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -7,
          mx: 3, // margin left and margin right
          px: 2,
          py: 2,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        {/* container for all grid items with spacing between them 3 and vertically centered */}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar alt="Profile Pic" src={dp} />
          </Grid>

          <Grid item>
            <MyBox
              color={theme.palette.font.main}
              fontSize={theme.typography.h4.fontSize}
              fontFamily={theme.typography.h4.fontFamily}
              fontWeight={theme.typography.h4.fontWeight}
            >
              Arin Soni
            </MyBox>
            <MyBox
              color={theme.palette.font.light}
              fontSize={theme.typography.h5.fontSize}
              fontFamily={theme.typography.h5.fontFamily}
              fontWeight={theme.typography.h5.fontWeight}
            >
              CTO
            </MyBox>
          </Grid>

          {/* For header */}

          {/* For Extra Small: 12 cls, medium: 6 clms, large: 4 clms*/}
          <Grid item xs={12} md={6} xl={4} sx={{ ml: "auto" }}>
            {/* Static: scroll with the content */}
            <AppBar
              position="static"
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderRadius: "8px",
                boxShadow: "none",

                // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  boxSizing: "border-box",
                  minHeight: "100%",
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: theme.palette.secondary.dark,
                    borderColor: theme.palette.font.main,
                    borderRadius: "100px",
                  },
                }}
              >
                <Tab
                  sx={{
                    ...tabStyle,
                    flexGrow: 1,
                  }}
                  label={
                    <div style={{ display: "inline-block" }}>
                      <HomeRoundedIcon style={iconStyle} />
                      <span
                        style={{
                          verticalAlign: "middle",
                          color: theme.palette.font.main,
                        }}
                      >
                        Home
                      </span>
                    </div>
                  }
                />

                <Tab
                  style={{ ...tabStyle, flexGrow: 1 }}
                  label={
                    <div style={{ display: "inline-block" }}>
                      <EmailRoundedIcon style={iconStyle} />
                      <span
                        style={{
                          verticalAlign: "middle",
                          color: theme.palette.font.main,
                        }}
                      >
                        Messages
                      </span>
                    </div>
                  }
                />
                <Tab
                  style={{ ...tabStyle, flexGrow: 1 }}
                  label={
                    <div style={{ display: "inline-block" }}>
                      <SettingsRoundedIcon style={iconStyle} />
                      <span
                        style={{
                          verticalAlign: "middle",
                          color: theme.palette.font.main,
                        }}
                      >
                        Settings
                      </span>
                    </div>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        
        <Box mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <AccountSettings />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              {showDivider && (
                <Divider orientation="vertical" color= {theme.palette.alt.main}/>
              )}
              <ProfileInfoCard />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              {showDivider && (
                <Divider orientation="vertical" color= {theme.palette.alt.main}  />
              )}

              <AdditionalFeatures />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default Profile;
