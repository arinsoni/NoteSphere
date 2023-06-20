import React, { useContext, useEffect, useState } from "react";

// My Components
import MyBox from "../../components/MyBox";

// My assets
import dp from "../../assets/images/dp.jpeg";
import bg from "../../assets/images/bg.jpg";
import breakpoints from "../../assets/base/breakpoints";

// Material UI components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

//theme
import app_context from "../../context/app/appContext";

const Profile = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

  // tabs
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [prevTabValue, setPrevTabValue] = useState(0);
  useEffect(() => {
    const handleTabsOrientation = () => {
      if (window.innerWidth < breakpoints.values.sm) {
        setTabsOrientation("vertical");
      } else {
        setTabsOrientation("horizontal");
      }
    };

    // event that calling the handleTabsOrientation
    window.addEventListener("resize", handleTabsOrientation);

    // calling handleTabsOrientation to set the state in initial value
    handleTabsOrientation();

    // removing event listener on unmounting
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
    setPrevTabValue(tabValue);
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
  // tabIndicatorProps
  const indicatorHeight = "100%";

  //styels
  const tabHeight = "30px";
  const myStyle = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "30px",

            height: "30px",
            borderRadius: "10px",
            top: `calc(50% - (${tabHeight} / 2))`,
            backgroundColor: "transparent",
            opacity: "1",
            "&.Mui-selected": {
              backgroundColor: "white",
              transition: "background-color 0.8s ease-in-out",
              color: theme.palette.font.main,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={myStyle}>
      <MyBox
        width="100%"
        height="300px"
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
          backgroundColor: theme.palette.primary.dark,
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

          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            {/* Static: scroll with the content */}
            <AppBar
              position="static"
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "10px",
                boxShadow: "0.02px",
                padding: "1px",
                height: "35px",
              }}
            >
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{
                  minHeight: "100%", // will occupy 100% heigh of 30px (AppBar)
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-around",
                  boxSizing: "border-box",
                }}
                TabIndicatorProps={{
                  style: {
                    bottom: "0",
                    backgroundColor: "transparent",
                    border: "1px solid",
                    borderColor: theme.palette.font.main,
                    height: indicatorHeight,
                    top: `calc(50% - (${indicatorHeight} / 2))`,
                    borderRadius: "10px",
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
                      <span style={{ verticalAlign: "middle" }}>Home</span>
                    </div>
                  }
                />

                <Tab
                  style={{ ...tabStyle, flexGrow: 1 }}
                  label={
                    <div style={{ display: "inline-block" }}>
                      <EmailRoundedIcon style={iconStyle} />
                      <span style={{ verticalAlign: "middle" }}>Messages</span>
                    </div>
                  }
                />
                <Tab
                  style={{ ...tabStyle, flexGrow: 1 }}
                  label={
                    <div style={{ display: "inline-block" }}>
                      <SettingsRoundedIcon style={iconStyle} />
                      <span style={{ verticalAlign: "middle" }}>Settings</span>
                    </div>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
};

export default Profile;
