import React, { useContext } from "react";

// Mui Components
import { Card, Box, Grid, Divider, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
//icons
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

//My Components
import StyleBox from "../../Profile/components/StyleBox";

//context
import app_context from "../../../context/app/appContext";

const AboutWebsite = () => {
  //app context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

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
            backgroundImage:
              "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 1), rgba(52, 71, 103, 0))!important",
            height: "0.0625rem",
            borderBottom: "none",
            opacity: "1",
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
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box p={2} display="flex" justifyContent="space-between">
          <StyleBox
            textTransform="capitalize"
            fontSize={theme.typography.heading.fontSize}
            color={theme.palette.font.main}
          >
            Website Information
          </StyleBox>
        </Box>

        <Box p={2} letterSpacing={1}>
          <StyleBox pt={-2}>
            MyWebsite is a platform dedicated to saving your notes and providing
            a convenient sign-up and login process.
          </StyleBox>
        </Box>
        <Box pr={2} pl={2} display="flex" justifyContent="space-between">
          <StyleBox
            textTransform="capitalize"
            fontSize={theme.typography.heading.fontSize}
            color={theme.palette.font.main}
          >
            Features
          </StyleBox>
        </Box>
        <Box p={2} letterSpacing={1}>
          <Box letterSpacing={1}>
            <StyleBox pt={-2} pb={2}>
              Save and organize your notes in one place
            </StyleBox>
            <StyleBox pt={-2} pb={2}>
              Securely store your sensitive information
            </StyleBox>
            <StyleBox pt={-2} pb={2}>
              Access your notes from anywhere, anytime
            </StyleBox>
            <StyleBox pt={-2} pb={2}>
              Intuitive user interface for easy navigation
            </StyleBox>
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AboutWebsite;
