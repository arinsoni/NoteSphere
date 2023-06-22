import React, { useContext } from "react";

// Mui Components
import { Card, Box, Grid, Divider, createTheme } from "@mui/material";
//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

//My Components
import StyleBox from "./StyleBox";

//theme
import app_context from "../../../context/app/appContext";
import { ThemeProvider } from "@emotion/react";

const ProfileInfoCard = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };
  //infoCard
  const InfoCard = ({ label, info, ...rest }) => {
    return (
      <Grid container spacing={2} alignItems="center" {...rest}>
        <Grid item>
          <StyleBox
            textTransform="capitalize"
            color={theme.palette.font.main}
            fontWeight={theme.typography.heading.fontWeight}
            item
          >
            {label}
          </StyleBox>
        </Grid>

        <Grid item>
          <StyleBox
            textTransform="capitalize"
            item
            fontWeight={theme.typography.subHeading.fontWeight}
          >
            {info}
          </StyleBox>
        </Grid>
      </Grid>
    );
  };
  // divider style
  const myTheme = createTheme({
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundImage: "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 1), rgba(52, 71, 103, 0))!important",
            height: "0.0625rem",
            borderBottom: "none",
            opacity: "1"
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
    <Card
      sx={{
        boxShadow: "none",
        width: "100%",
        marginRight: "7px",
        backgroundColor: theme.palette.primary.main
      }}
    >
      <Box p={2} display="flex" justifyContent="space-between">
        <StyleBox
          textTransform="capitalize"
          fontSize={theme.typography.heading.fontSize}
          color={theme.palette.font.main}
        >
          Profile Information
        </StyleBox>

        <StyleBox textTransform="capitalize" color={theme.palette.font.main}>
          <ModeEditRoundedIcon style={iconStyle} />
        </StyleBox>
      </Box>

      <Box p={2} letterSpacing={1}>
        <StyleBox pt={-2} pb={2}>
          Hey there, I'm Arin Soni, I'm Kota, Rajasthan. Ya the so called
          "Education" city :), Now I'm in IITB persuing Mech (just persuing,
          love coding though) anyways, if I'm not coding then you can find me
          playing Table tennis or maybe talking to my gf ;)
        </StyleBox>
        {/* <Divider color={theme.palette.neutral.dark} /> */}
        <Divider />
        <InfoCard label="Name: " info="Arin Soni" />
        <InfoCard label="Mobile: " info="76658-52977" />
        <InfoCard label="Email: " info="arinsoni2809@gmail.com" />
        <InfoCard label="Location: " info="Kota, Rajasthan" />
        <InfoCard label="Location: " info="Kota, Rajasthan" />
        <InfoCard label="Social: " info={<FacebookRoundedIcon />} />
      </Box>
    </Card>
    </ThemeProvider>
  );
};

export default ProfileInfoCard;
