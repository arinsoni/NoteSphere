import React, { useContext } from "react";

// Mui Components
import { Card, Box } from "@mui/material";
//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

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
  return (
    <>
    <div style={{ width: "100%" }} >
      <Box p={2} display="flex" justifyContent="space-around" alignItems="center" >
        <MyBox
          color={theme.palette.font.main}
          fontSize={theme.typography.heading.fontSize}
          fontFamily={theme.typography.h5.fontFamily}
          fontWeight={theme.typography.h5.fontWeight}
          textTransform="capitalize"
        >
          title
        </MyBox>
        <MyBox
          color={theme.palette.font.main}
          fontSize={theme.typography.heading.fontSize}
          fontFamily={theme.typography.h5.fontFamily}
          fontWeight={theme.typography.h5.fontWeight}
          textTransform="capitalize"
        >
          
            <ModeEditRoundedIcon style={iconStyle} />
        
        </MyBox>
      </Box>
      </div>
 </>
  );
};

export default ProfileInfoCard;
