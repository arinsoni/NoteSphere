import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// context
import appContext from "../context/app/appContext";

export default function MyAlert( props ) {
  const AppContext = React.useContext(appContext);

  const list = [
    { title: "Success", color: "success", icon: <CheckCircleIcon /> },
    { title: "Warning", color: "warning", icon: <WarningIcon /> },
    { title: "Error", color: "danger", icon: <ReportIcon /> },
    { title: "Info", color: "info", icon: <InfoIcon /> },
  ];

  const index = props.alert && props.alert.index;
  const msg = props.alert && props.alert.msg;
  const items = [list[index]];
  // console.log("alrty: " + props.alert.index )

  return (
    <>
{props.alert  &&
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {items.map(({ title, color, icon }) => (
            <Alert
              key={title}
              sx={{ alignItems: "flex-start" }}
              startDecorator={React.cloneElement(icon, {
                sx: { mt: "2px", mx: "4px" },
                fontSize: "xl2",
              })}
              variant="soft"
              color={color}
              endDecorator={
                <IconButton variant="soft" size="sm" color={color}>
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <div>
                <Typography fontWeight="lg" mt={0.25}>
                  {title}
                </Typography>
                <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                   {msg}
                </Typography>
              </div>
            </Alert>
          ))}
        </Box>
}
    </>
  );
}
