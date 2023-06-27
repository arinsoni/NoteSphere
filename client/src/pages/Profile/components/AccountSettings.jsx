import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//My Components
import StyleBox from "./StyleBox";
import {
  RootContainer,
  StyledTextField,
  SubmitButton,
} from "../../Notes/Components/NotesComponents";

// MUi Components
import { Card, Box, Modal } from "@mui/material";

//icons
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//context
import appContext from "../../../context/app/appContext";
import userContext from "../../../context/user/userContext";

//alert
import MyAlert from "../../../components/Alert";
import ModalPopup from "../Modals/ModalPopup";
import ModalForm from "../Modals/ModalForm";

const AccountSettings = () => {
  //alerts
  const success = [
    { title: "Success", color: "success", icon: <CheckCircleIcon /> },
  ];
  const warning = [
    { title: "Warning", color: "warning", icon: <WarningIcon /> },
  ];
  const error = [{ title: "Error", color: "danger", icon: <ReportIcon /> }];
  const info = [{ title: "Info", color: "info", icon: <InfoIcon /> }];

  // navigation
  const navigate = useNavigate();
  //app context
  const AppContext = useContext(appContext);
  const { theme, setProgress, showAlert } = AppContext;

  //user context
  const UserContext = useContext(userContext);
  const { user, isLogin, setIsLogin } = UserContext;

  // user initilaisation
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    if (user && user._id) {
      setId(user._id);
      setEmail(user.email);
    }
  }, []);

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
  const [passwordDialogContext, setPasswordDialogContext] = useState(false);
  const handlePasswordDialogContextOpen = () => {
    setPasswordDialogContext(true);
  };
  const handlePasswordDialogContextClose = () => {
    setPasswordDialogContext(false);
  };

  // Form handling
  const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);
  const handleOpenForm = () => {
    setOpenChangePasswordForm(true);
  };
  const handleCloseForm = () => {
    setOpenChangePasswordForm(false);
  };

  const handleYesPassword = (e) => {
    e.preventDefault();
    setPasswordDialogContext(false);
    setOpenChangePasswordForm(true);
    handleChangePasswordOTP(e);
  };

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // to sent OTP for password change

  const handleChangePasswordOTP = async (e) => {
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
      showAlert(0, `OTP has been sent to your mail-id:  ${email}`);
    } else {
      showAlert(1, json.message);
      alert("error");
    }
    setProgress(100);
  };

  // to submit the form for changing password

  const handleChangePasswordForm = async (e) => {
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
      showAlert(0, `${json.message}`);
      localStorage.setItem("token", json.token);
      navigate("/login");
    } else {
      showAlert(1, `${json.message}`);
    }
    setProgress(100);
  };

  //Delete Acccount
  const [accDeleteDialogContext, setAccDeleteDialogContext] = useState(false);
  const handleAccDeleteDialogContextOpen = () => {
    setAccDeleteDialogContext(true);
  };
  const handleAccDeleteDialogContextClose = () => {
    setAccDeleteDialogContext(false);
  };
  const handleYesAccDelete = (e) => {
    e.preventDefault();
    setAccDeleteDialogContext(false);
    handleAccDeleteFormOpen();
  };

  // Form handling
  const [accDeletePassword, setAccDeletePassword] = useState("");
  const [openAccDeleteForm, setOpenAccDeleteForm] = useState(false);
  const handleAccDeleteFormOpen = () => {
    setOpenAccDeleteForm(true);
  };
  const handleAccDeleteFormClose = () => {
    setOpenAccDeleteForm(false);
  };
  const handleAccDelete = async () => {
    try {
      setProgress(20);
      const response = await fetch("http://localhost:5000/auth/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ accDeletePassword }),
      });
      setProgress(40);
      const json = await response.json();

      if (json.success) {
        // User deletion successful, perform any necessary cleanup or redirects
        localStorage.removeItem("token", json.token);
        setProgress(100);
        navigate("/login");
        showAlert(0, "Account Deleted Successfully");
      } else {
        showAlert(1, json.message);
      }
    } catch (error) {
      showAlert(1, "Internal Server Error");
    }
  };

  //Update Mail Id

  const [updateMailDialogContext, setUpdateMailDialogContext] = useState(false);
  const handleUpdateMailDialogContextOpen = () => {
    setUpdateMailDialogContext(true);
  };
  const handleUpdateMailDialogContextClose = () => {
    setUpdateMailDialogContext(false);
  };
  const handleYesUpdateMail = (e) => {
    e.preventDefault();
    setUpdateMailDialogContext(false);
    handleUpdateMailFormOpen();
  };

  // form handling
  const [oldMailId, setOldMailId] = useState("");
  const [newMailId, setNewMailId] = useState("");
  const [openUpdateMailForm, setOpenUpdateMailForm] = useState(false);
  const handleUpdateMailFormOpen = () => {
    setOpenUpdateMailForm(true);
  };
  const handleUpdateMailFormClose = () => {
    setOpenUpdateMailForm(false);
  };

  const handleUpdateMailId = async () => {
    try {
      setProgress(20);
      const response = await fetch("http://localhost:5000/auth/update-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ oldMailId, newMailId }),
      });
      setProgress(40);
      const json = await response.json();
      if (json.success) {
        setProgress(100);
        handleUpdateMailFormClose();
        showAlert(0, json.message);
      } else {
        showAlert(1, json.message);
      }
    } catch (error) {
      showAlert(1, "Internal Server Error");
    }
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

      {/* Dialog Box for Change Password */}
      <ModalPopup
        open={passwordDialogContext}
        onClose={handlePasswordDialogContextClose}
        onYesClick={handleYesPassword}
        onNoClick={handlePasswordDialogContextClose}
        msg="Do you want to change your password?"
      />
      {/* Form Popoup for changing password */}
      <ModalForm
        open={openChangePasswordForm}
        onClose={handleCloseForm}
        label_1="OTP"
        value_1={otp}
        fun_1={setOtp}
        label_2="Old Password"
        value_2={password}
        fun_2={setPassword}
        label_3="New Password"
        value_3={confirmPassword}
        fun_3={setConfirmPassword}
        onSubmit={handleChangePasswordForm}
      />
      {/* Form Popoup for changing password ------- X ------ */}
      <AccBox
        text="Change Password"
        icon={KeyRoundedIcon}
        onClick={handlePasswordDialogContextOpen}
      />
      <AccBox text="2-F Authentication" icon={SecurityRoundedIcon} />

      {/* Dialog Box for Update Mail-id */}
      <ModalPopup
        open={updateMailDialogContext}
        onClose={handleUpdateMailDialogContextClose}
        onYesClick={handleYesUpdateMail}
        onNoClick={handleUpdateMailDialogContextClose}
        msg="Are you sure? You want to update you mail-id?"
      />

      <ModalForm
        open={openUpdateMailForm}
        onClose={handleUpdateMailFormClose}
        label_1="Old Email Id"
        value_1={oldMailId}
        fun_1={setOldMailId}
        label_2="New E-Mail Id"
        value_2={newMailId}
        fun_2={setNewMailId}
        onSubmit={handleUpdateMailId}
      />

      <AccBox text="Update Email-Id" icon={ModeEditRoundedIcon} onClick={handleUpdateMailDialogContextOpen} />

      {/* Dialog Box for Delete Account */}
      <ModalPopup
        open={accDeleteDialogContext}
        onClose={handleAccDeleteDialogContextClose}
        onYesClick={handleYesAccDelete}
        onNoClick={handleAccDeleteDialogContextClose}
        msg="Are you sure? You want to delete your account permanently?"
      />
      {/* Form for Acc deletion */}

      <ModalForm
        open={openAccDeleteForm}
        onClose={handleAccDeleteFormClose}
        label_1="Password"
        value_1={accDeletePassword}
        fun_1={setAccDeletePassword}
        onSubmit={handleAccDelete}
      />

      <AccBox
        text="Account Closure"
        icon={DeleteOutlineRoundedIcon}
        onClick={handleAccDeleteDialogContextOpen}
      />
      <AccBox text="Update Profile Pic" icon={InsertEmoticonRoundedIcon} />
      <AccBox text="Export your Notes" icon={FileDownloadRoundedIcon} />
    </Card>
  );
};

export default AccountSettings;
