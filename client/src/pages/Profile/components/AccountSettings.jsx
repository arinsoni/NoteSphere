import React, { useContext } from "react";

// MUi Components
import { Card, Box } from "@mui/material";
//icons
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
//theme
import app_context from "../../../context/app/appContext";
import StyleBox from "./StyleBox";

const AccountSettings = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;

  // icon style
  let iconStyle = {
    verticalAlign: "middle",
    marginRight: "0.5rem",
  };
  //
  const AccBox = ({ text, icon, ...rest }) => {
    const SelectedIcon = icon;
    return (
      <Box pr={2} pl={2} {...rest}>
        <Box display="flex" justifyContent="space-between" {...rest}>
          <StyleBox textTransform="capitalize">{text}</StyleBox>

          <StyleBox textTransform="capitalize" color={theme.palette.font.main}>
            <SelectedIcon style={iconStyle} />
          </StyleBox>
        </Box>
      </Box>
    );
  };

  return (
    <Card sx={{ boxShadow: "none", backgroundColor: theme.palette.primary.main }}>
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
      <AccBox text="Change Password" icon={KeyRoundedIcon} />
      <AccBox text="2-F Authentication" icon={SecurityRoundedIcon} />
      <AccBox text="Update Email-Id" icon={ModeEditRoundedIcon} />
      <AccBox text="Account Closure" icon={DeleteOutlineRoundedIcon} />
      <AccBox text="Update Profile Pic" icon={InsertEmoticonRoundedIcon} />
      <AccBox text="Export your Notes" icon={FileDownloadRoundedIcon} />
    </Card>
  );
};

export default AccountSettings;
