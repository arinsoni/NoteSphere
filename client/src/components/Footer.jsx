import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import appContext from "../context/app/appContext";

const Footer = () => {
  const { theme, isSideNavOpen } = useContext(appContext)
  return (
    <Box
      component="footer"
      sx={{
        alignContent: "center",
        padding: "16px",
        textAlign: "center",
        margin : "0 25px",
        
        

      }}
    >
      <Typography variant="body2" color={theme.palette.secondary.dark}  >
        © 2023 All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
