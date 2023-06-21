import React, { useContext } from "react";

// Mui Components
import { Card, Box, Grid } from "@mui/material";
//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

//My Components
import StyleBox from "./StyleBox"

//theme
import app_context from "../../../context/app/appContext";

const ProfileInfoCard = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        width: "100%",
        marginRight: "7px",
      }}
    >
      <Box p={2} display="flex" justifyContent="space-between">

        <StyleBox textTransform="capitalize"  fontSize={theme.typography.heading.fontSize}>
          Profile Information
        </StyleBox>

        <StyleBox textTransform="capitalize">
          <ModeEditRoundedIcon style={iconStyle} />
        </StyleBox>

      </Box>

      <Box p={2} letterSpacing={1}>

        <StyleBox pt={-2} >
          Hey there, I'm Arin Soni, I'm Kota, Rajasthan. Ya the so called
          "Education" city :), Now I'm in IITB persuing Mech (just persuing,
          love coding though) anyways, if I'm not coding then you can find me
          playing Table tennis or maybe talking to my gf ;)
        </StyleBox>

        <StyleBox textTransform="capitalize">
          <b>Full Name: </b> Arin Soni
        </StyleBox>

        <StyleBox textTransform="capitalize">
          <b>Mobile: </b> 76658 52977
        </StyleBox>

        <StyleBox>
          <b>Email: </b> arinsoni2809@gmail.com
        </StyleBox>

        <StyleBox>
          <b>Location: </b> Kota, Rajasthan
        </StyleBox>

        <StyleBox display="flex" alignItems="center">
          <Box>
            <b>Social: </b>
          </Box>
          <Box pl={1}>
            <FacebookRoundedIcon />
          </Box>
        </StyleBox>

      </Box>
    </Card>
  );
};

export default ProfileInfoCard;
