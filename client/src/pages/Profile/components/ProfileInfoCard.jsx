import React, { useContext, useEffect, useState } from "react";

// Mui Components
import {
  Card,
  Box,
  Grid,
  Divider,
  createTheme,
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
  const [info, setInfo] = useState({
    bio: "",
    name: "",
  });
  // const [bio, setBio] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState({
    initialBio: " ",
    initialName: " ",
  });

  useEffect(() => {
    if (user && user._id) {
      setUpdatedInfo({
        initialBio: user.bio,
        initialName: user.name,
      });
    }
  }, [user]);

  const [openBioForm, setOpenBioForm] = useState(false);
  const changeBio = () => {
    setOpenBioForm(true);
    setInfo({
      bio: user.bio,
      name: user.name,
    });
  };

  const handleClick = (e) => {
    handleBioFormSubmit(info.bio, info.name);
    setOpenBioForm(false);
    showAlert(0, "Updated Successfully");
  };

  const handleClose = () => {
    setOpenBioForm(false);
  };

  const handleBioFormSubmit = async (newBio, newName) => {
    try {
      setProgress(20);
      const response = await fetch("https://note-sphere.vercel.app/auth/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ newBio, newName, email }),
      });
      setProgress(40);
      const json = await response.json();

      if (json.success) {
        setProgress(100);
        setInfo({
          bio: json.newBio,
          name: json.newName,
        });
        setUpdatedInfo({ initialBio: json.newBio, initialName: json.newName });

        handleClose();
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
              onClick={changeBio}
              sx={{
                cursor: "pointer",
              }}
            />
          </StyleBox>
        </Box>

        <ModalForm
          open={openBioForm}
          onClose={handleClose}
          label_1="Bio"
          name_1="bio"
          value_1={info.bio}
          onChange_1={(e) => setInfo({ ...info, bio: e.target.value })}
          label_2="Name"
          name_2="name"
          value_2={info.name}
          onChange_2={(e) => setInfo({ ...info, name: e.target.value })}
          onSubmit={handleClick}
        />

        <Box p={2} letterSpacing={1}>
          <StyleBox pt={-2} pb={2}>
            {updatedInfo.initialBio}
            {/* Hey there, I'm Arin Soni, I'm Kota, Rajasthan. Ya the so called
          "Education" city :), Now I'm in IITB persuing Mech (just persuing,
          love coding though) anyways, if I'm not coding then you can find me
          playing Table tennis or maybe talking to my gf ;) */}
          </StyleBox>
          {/* <Divider color={theme.palette.neutral.dark} /> */}
          <Divider />
          <InfoCard label="Name: " info={updatedInfo.initialName} />
          <InfoCard label="Mobile: " info="76658-52977" />
          <InfoCard label="Email: " info={user && user.email} />
          <InfoCard label="Location: " info="Kota, Rajasthan" />
          <InfoCard label="Social: " info={<FacebookRoundedIcon />} />
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default ProfileInfoCard;
