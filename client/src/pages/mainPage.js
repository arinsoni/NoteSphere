import { Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Profile from './Profile/Profile';
import SideNav from '../components/SideNav';
import MenuIcon from '@mui/icons-material/Menu';
import breakpoints from "../assets/base/breakpoints";

const MainPage = (props) => {
  const { showAlert, setProgress, setShowNav } = props;
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // Update setIsSideNavOpen when display changes
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < breakpoints.values.xl;
      setIsSideNavOpen(!isSmallScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsSideNavOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      {isSideNavOpen && (
        <Box width={ isSideNavOpen ? "15%" : 0}  >
          <SideNav toggleSideNav={toggleSideNav} setIsSideNavOpen={setIsSideNavOpen} />
        </Box>
      )}
     
      <Box width={isSideNavOpen ? "80%" : "100%"} ml={isSideNavOpen ? "4%" : 0}>
        <Profile showAlert={showAlert} setProgress={setProgress} setShowNav={setShowNav} />
      </Box>
    </Box>
  );
};

export default MainPage;
