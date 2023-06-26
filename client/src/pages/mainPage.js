import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import SideNav from "../components/SideNav";
import app_context from "../context/app/appContext";
import NavBar from "../components/NavBar";

const MainPage = ({ children }) => {
  const AppContext = useContext(app_context);
  const { isSideNavOpen } = AppContext;


  return (
    <Box sx={{ display: "flex", }}>
      <Box width={isSideNavOpen ? "200px" : 0} position="fixed"  >
        <SideNav />
      </Box>

      <Box sx={{ flex: 1, position: "relative", }}>

        <Box
          sx={{
            position: "absolute",
           
            top:60,
            right: 0,
            bottom: 0,
            left: isSideNavOpen ? "280px" : 0,
            width: isSideNavOpen ? `calc(1250px-${window.innerWidth})` : "1400",
            zIndex: "-1"
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
