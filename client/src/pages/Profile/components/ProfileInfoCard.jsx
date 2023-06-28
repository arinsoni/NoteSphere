import React, { useContext, useEffect, useState } from "react";

// Mui Components
import {
  Card,
  Box,
  Grid,
  Divider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

//My Components
import StyleBox from "./StyleBox";

//context
import app_context from "../../../context/app/appContext";
import userContext from "../../../context/user/userContext";
import ModalForm from "../Modals/ModalForm";

const ProfileInfoCard = () => {
  //app context
  const AppContext = useContext(app_context);
  const { theme, setProgress, showAlert } = AppContext;

  //user context
  const UserContext = useContext(userContext);
  const { user } = UserContext;

  //user credentials
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  });
  console.log(email);

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

  // bio update
  const [bio, setBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [initialBio, setInitialBio] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.bio) {
      setInitialBio(user.bio);
      setUpdatedBio(user.bio); // Set the initial bio value for updatedBio as well
      setLoading(false);
    }
  }, [user]);

  const [bioFormOpen, setBioFormOpen] = useState(false);
  const handleBioFormOpen = () => {
    setBioFormOpen(true);
  };
  const handleBioFormClose = () => {
    setBioFormOpen(false);
  };

  const handleBioFormSubmit = async () => {
    try {
      setProgress(20);
      const response = await fetch("http://localhost:5000/auth/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ bio, email }),
      });
      setProgress(40);
      const json = await response.json();

      if (json.success) {
        setProgress(100);
        setUpdatedBio(json.bio); // Set the updated bio value
        handleBioFormClose();
        showAlert(0, json.message);
      } else {
        showAlert(1, json.message);
      }
    } catch (error) {
      showAlert(1, error.message);
    }
  };

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
            Profile Information
          </StyleBox>

          <StyleBox textTransform="capitalize" color={theme.palette.font.main}>
            <ModeEditRoundedIcon
              style={iconStyle}
              onClick={handleBioFormOpen}
            />
          </StyleBox>
        </Box>

        <ModalForm
          open={bioFormOpen}
          onClose={handleBioFormClose}
          label_1="Bio"
          value_1={bio}
          fun_1={setBio}
          onSubmit={handleBioFormSubmit}
        />
        <Box p={2} letterSpacing={1}>
          <StyleBox pt={-2} pb={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {updatedBio || initialBio ? (
                  <p>Bio: {updatedBio || initialBio}</p>
                ) : (
                  <p>Tell us about yourself</p>
                )}
              </>
            )}
            {/* Hey there, I'm Arin Soni, I'm Kota, Rajasthan. Ya the so called
          "Education" city :), Now I'm in IITB persuing Mech (just persuing,
          love coding though) anyways, if I'm not coding then you can find me
          playing Table tennis or maybe talking to my gf ;) */}
          </StyleBox>
          {/* <Divider color={theme.palette.neutral.dark} /> */}
          <Divider />
          <InfoCard label="Name: " info={user.name} />
          <InfoCard label="Mobile: " info="76658-52977" />
          <InfoCard label="Email: " info={user.email} />
          <InfoCard label="Location: " info="Kota, Rajasthan" />
          <InfoCard label="Social: " info={<FacebookRoundedIcon />} />
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default ProfileInfoCard;
