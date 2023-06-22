import React, { useContext, useEffect } from "react";

//My components
import StyleBox from "../pages/Profile/components/StyleBox";

// Mui Componenets
import { Box, Divider } from "@mui/material";
//icons
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

//theme
import app_context from "../context/app/appContext";
import breakpoints from "../assets/base/breakpoints";

const SideNav = (props) => {
  //props


  console.log("sidenav: " + props.isSideNavOpen)

  //context
  const AppContext = useContext(app_context);
  const { theme, toggleTheme } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  const NavItem = ({ label, icon, ...rest }) => {
    const SelectedIcon = icon;
    return (
      <Box pr={2} pl={2} {...rest}>
        <Box display="flex" justifyContent="space-between" {...rest}>
          <StyleBox textTransform="capitalize" color={theme.palette.font.main}>
            <SelectedIcon style={iconStyle} />
          </StyleBox>
          <StyleBox textTransform="capitalize">{label}</StyleBox>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      p={3}
      sx={({ breakpoints }) => ({
        backgroundColor: "red",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        margin: "2%",
        
        [breakpoints.down("xl")]: {
            display: props.showSideNav ? "block" : "none"
        },
        zIndex: "1"
      })}
    >
      <NavItem label="NoteSphere" icon={SettingsRoundedIcon} />
      <Divider />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
      <NavItem label="NoteBoard" icon={SettingsRoundedIcon} />
    </Box>
  );
};

export default SideNav;
