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

const FutureGoals = () => {
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
            Future Goals
          </StyleBox>
        </Box>

        <Box p={2} letterSpacing={1}>
          <StyleBox pt={-2}>
            Our mission is to simplify the note-taking process and provide a
            reliable platform for individuals to store and access their
            important information. With MyWebsite, you can focus on capturing
            your thoughts without worrying about losing or misplacing your
            notes.
          </StyleBox>
        </Box>
        <Box p={2} letterSpacing={1}>
          <StyleBox pt={-2}>
            We are constantly working to improve our platform and add new
            features to enhance your note-taking experience. If you have any
            suggestions or feedback, please feel free to reach out to us. We'd
            love to hear from you!
          </StyleBox>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default FutureGoals;
