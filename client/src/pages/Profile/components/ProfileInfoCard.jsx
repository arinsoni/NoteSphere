import React, { useContext } from "react";

// Mui Components
import { Card, Box, Grid } from "@mui/material";
//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

//My Components
import MyBox from "../../../components/MyBox";

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

  //Info Box
  const InfoBox = ({ children, ...rest }) => {
    return (
      <Box
        color={theme.palette.font.main}
        fontSize={theme.typography.subHeading.fontSize}
        fontFamily={theme.typography.h5.fontFamily}
        fontWeight={theme.typography.h5.fontWeight}
        right="0"
        pt={2}
        {...rest} // Spread the additional props here
      >
        {children}
      </Box>
    );
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
        <Box
          color={theme.palette.font.main}
          fontSize={theme.typography.heading.fontSize}
          fontFamily={theme.typography.h5.fontFamily}
          fontWeight={theme.typography.h5.fontWeight}
          textTransform="capitalize"
        >
          Profile Information
        </Box>

        <Box
          color={theme.palette.font.main}
          fontSize={theme.typography.heading.fontSize}
          fontFamily={theme.typography.h5.fontFamily}
          fontWeight={theme.typography.h5.fontWeight}
          textTransform="capitalize"
          right="0"
        >
          <ModeEditRoundedIcon style={iconStyle} />
        </Box>
      </Box>
      <Box p={2} letterSpacing={1}>

        <InfoBox pt={-2} >
          Hey there, I'm Arin Soni, I'm Kota, Rajasthan. Ya the so called
          "Education" city :), Now I'm in IITB persuing Mech (just persuing,
          love coding though) anyways, if I'm not coding then you can find me
          playing Table tennis or maybe talking to my gf ;)
        </InfoBox>

        <InfoBox textTransform="capitalize">
          <b>Full Name: </b> Arin Soni
        </InfoBox>

        <InfoBox textTransform="capitalize">
          <b>Mobile: </b> 76658 52977
        </InfoBox>

        <InfoBox>
          <b>Email: </b> arinsoni2809@gmail.com
        </InfoBox>

        <InfoBox>
          <b>Location: </b> Kota, Rajasthan
        </InfoBox>

        <InfoBox display="flex" alignItems="center">
          <Box>
            <b>Social: </b>
          </Box>
          <Box pl={1}>
            <FacebookRoundedIcon />
          </Box>
        </InfoBox>

      </Box>
    </Card>
  );
};

export default ProfileInfoCard;
