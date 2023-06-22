import React, { useContext, useEffect } from "react";

// MUi Components
import {
  Card,
  Box,
  createTheme,
  ThemeProvider,
  withStyles,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
//icons
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

//theme
import app_context from "../../../context/app/appContext";
import StyleBox from "./StyleBox";

const AdditionalFeatures = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme, toggleTheme } = AppContext;
  //theme toggle
  const handleThemeToggle = () => {
    toggleTheme();
  };
  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };
  //#42424a
  // Custom theme

  const myTheme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "white",
            "&.Mui-checked": {
              border: "#42424a",
              color: "white",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#42424a",
              opacity: "1",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Card sx={{ boxShadow: "none", width: "100%", marginRight: "7px", backgroundColor: theme.palette.primary.main }}>
        <Box p={2}>
          <StyleBox
            textTransform="capitalize"
            fontSize={theme.typography.heading.fontSize}
            color={theme.palette.font.main}
          >
            Additional Features
          </StyleBox>
        </Box>

        <Box
          pr={2}
          pl={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <StyleBox textTransform="capitalize">Light Mode</StyleBox>
          <StyleBox marginRight="0" >
            <Switch onClick={handleThemeToggle} />
          </StyleBox>
        </Box>

        <Box pr={2} pl={2} display="flex" justifyContent="space-between">
          <StyleBox textTransform="capitalize">Notifications</StyleBox>
          <StyleBox color={theme.palette.font.main}>
            <NotificationsActiveRoundedIcon />
          </StyleBox>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AdditionalFeatures;
