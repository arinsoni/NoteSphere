import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import Profile from "./Profile/Profile";
import SideNav from "../components/SideNav";
import breakpoints from "../assets/base/breakpoints";
import app_context from "../context/app/appContext";

const MainPage = (props) => {
  const { showAlert, setProgress, setShowNav } = props;
  const AppContext = useContext(app_context);
  const { setShowSideNav, showSideNav, isSideNavOpen, toggleSideNav } = AppContext;


  return (
    <Box sx={{ display: "flex" }}>
      <Box width={isSideNavOpen ? "200px" : 0} position="fixed">
        <SideNav
          toggleSideNav={toggleSideNav}
          setShowSideNav={setShowSideNav}
          showSideNav={showSideNav}
          isSideNavOpen={isSideNavOpen}
        />
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: isSideNavOpen ? "300px" : 0,
            width:isSideNavOpen ? `calc(1250px-${window.innerWidth})` : "1400",
            zIndex: "-1"
          }}
        >
          <Profile
            showAlert={showAlert}
            setProgress={setProgress}
            setShowNav={setShowNav}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
