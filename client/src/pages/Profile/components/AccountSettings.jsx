import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// MUi Components
import { Card, Box, Modal } from "@mui/material";

//icons
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
//theme
import appContext from "../../../context/app/appContext";
import userContext from "../../../context/user/userContext";
import StyleBox from "./StyleBox";
import {
  RootContainer,
  StyledTextField,
  SubmitButton,
} from "../../Notes/Components/NotesComponents";

const AccountSettings = () => {
  // navigation
  const navigate = useNavigate();
  //app context
  const AppContext = useContext(appContext);
  const { theme } = AppContext;

  //user context
  const UserContext = useContext(userContext);
  const { user, progress, setProgress, isLogin, setIsLogin } = UserContext;

  // user initilaisation
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    if (user && user._id) {
      setId(user._id);
      setEmail(user.email);
    }
  });

  //user context

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };
  //
  const AccBox = ({ text, icon, onClick, ...rest }) => {
    const SelectedIcon = icon;
    return (
      <Box pr={2} pl={2} {...rest}>
        <Link onClick={onClick} style={{ textDecoration: "none" }}>
          <Box display="flex" justifyContent="space-between" {...rest}>
            <StyleBox textTransform="capitalize">{text}</StyleBox>

            <StyleBox
              textTransform="capitalize"
              color={theme.palette.font.main}
            >
              <SelectedIcon style={iconStyle} />
            </StyleBox>
          </Box>
        </Link>
      </Box>
    );
  };

  // Log out
  const handleLogout = () => {
    setProgress(50);
    localStorage.removeItem("token");
    navigate("/login");
    setProgress(100);
    setIsLogin(false);
  };

  //change password
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleYesPassword = (e) => {
    e.preventDefault();
    setOpen(false);
    setOpenForm(true);
    handlePasswordChange(e);
  };

  // form
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(30);
    // console.log(`${localStorage.getItem('token')} - reset`)
    // Send the password reset request to the backend
    const response = await fetch("http://localhost:5000/auth/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ password, confirmPassword, email, otp }),
    });
    setProgress(60);
    const json = await response.json();

    setProgress(80);
    if (json.success) {
      // props.showAlert(`${json.message}`, "success");
      alert("success");
      localStorage.setItem("token", json.token);
      navigate("/login");
    } else {
      // props.showAlert(`${json.message}`, "success");
      alert("error");
    }
    setProgress(100);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setProgress(40);
    // Send the password change request to the backend
    const response = await fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ email }),
    });
    setProgress(60);
    const json = await response.json();
    setProgress(80);
    if (json.success) {
      alert("success");
    } else {
      // props.showAlert(json.message, "error");
      alert("error");
    }
    setProgress(100);
  };

  return (
    <Card
      sx={{ boxShadow: "none", backgroundColor: theme.palette.primary.main }}
    >
      <Box p={2}>
        <StyleBox
          textTransform="capitalize"
          fontSize={theme.typography.heading.fontSize}
          color={theme.palette.font.main}
        >
          Account Settings
        </StyleBox>
      </Box>
      <StyleBox
        p={2}
        textTransform="uppercase"
        fontSize={theme.typography.para.fontSize}
        color={theme.palette.font.main}
      >
        account
      </StyleBox>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RootContainer
          sx={{
            maxWidth: "400px",
            width: "80%",
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
          <StyleBox style={{ textAlign: "center" }}>
            Do you want to change your password?
          </StyleBox>
          <Box display="flex" flexDirection="row" justifyContent="space-around">
            <SubmitButton onClick={handleYesPassword}>Yes</SubmitButton>
            <SubmitButton onClick={handleClose}>No</SubmitButton>
          </Box>
        </RootContainer>
      </Modal>

      <Modal
        open={openForm}
        onClose={handleCloseForm}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RootContainer sx={{ width: "400px", margin: "0 auto" }}>
        <StyledTextField
          label="OTP"
          fullWidth
          margin="normal"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
        <StyledTextField
          label="Old Password"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
        <StyledTextField
          label="New Password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={confirmPassword}
      
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
        <SubmitButton type="submit" variant="contained" onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </RootContainer>
      </Modal>

      <AccBox
        text="Change Password"
        icon={KeyRoundedIcon}
        onClick={handleOpen}
      />
      <AccBox text="2-F Authentication" icon={SecurityRoundedIcon} />
      <AccBox text="Update Email-Id" icon={ModeEditRoundedIcon} />
      <AccBox text="Account Closure" icon={DeleteOutlineRoundedIcon} />
      <AccBox text="Update Profile Pic" icon={InsertEmoticonRoundedIcon} />
      <AccBox text="Export your Notes" icon={FileDownloadRoundedIcon} />
    </Card>
  );
};

export default AccountSettings;
