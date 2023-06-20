import React, { useContext, useEffect, useState } from "react";

// My Components
import MyBox from "../../components/MyBox";
// import MyIcon from "../../components/MyIcon";
import MyTab from "./components/MyTab";

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

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

//theme
import app_context from "../../context/app/appContext";

const Profile = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

  // tabs
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
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

  const handleSetTabValue = (e, newValue) => setTabValue(newValue);

  return (
    <>
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
                borderRadius: "20px",
                boxShadow: "0",
              }}
            >
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
              >
                <MyTab label="Home" icon={HomeRoundedIcon} ht={4} />
                <MyTab label="Messages" icon={EmailRoundedIcon} ht={4} />
                <MyTab label="Settings" icon={SettingsRoundedIcon} ht={4} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Profile;
