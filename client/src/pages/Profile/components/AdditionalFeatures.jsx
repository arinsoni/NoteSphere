import React, { useContext } from "react";

// MUi Components
import { Card, Box, createTheme, ThemeProvider } from "@mui/material";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

//theme
import app_context from "../../../context/app/appContext";
import StyleBox from "./StyleBox";

const AdditionalFeatures = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

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
            color: "white"
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#42424a",
            opacity: "1"

          },
        },
      },
    },
  },
});

  
  
  

  return (
<ThemeProvider theme={myTheme}>
    <Card sx={{ boxShadow: "none" }}>
      <Box p={2}>
        <StyleBox
          textTransform="capitalize"
          fontSize={theme.typography.heading.fontSize}
        >
          Account Settings
        </StyleBox>
      </Box>
      <StyleBox p={2} textTransform="uppercase" fontSize={theme.typography.para.fontSize}>
        account
      </StyleBox>
      
      <Box pr={2} pl={2} >
        
        <Box display="flex" justifyContent="space-between"  >

        <FormControlLabel control={<Switch defaultChecked />} label="Label" />


          <StyleBox textTransform="capitalize">
           
          </StyleBox>
        </Box>

      </Box>

    </Card>
    </ThemeProvider>
  );
};

export default AdditionalFeatures;



// 1. Theme Selection:

// 2. Display Settings:
// - Provide options for users to customize the display settings such as font size, layout, or background color.



// 10. Help and Support:
// - Include links or resources for accessing help, support, or FAQs related to the platform and its features.

