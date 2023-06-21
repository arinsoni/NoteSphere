import React, { useContext } from "react";

//My Components
import MyBox from "../../../components/MyBox";

// MUi Components
import { Card, Box } from "@mui/material";

//theme
import app_context from "../../../context/app/appContext";

const PlatformSettings = () => {
  //context
  const AppContext = useContext(app_context);
  const { theme } = AppContext;
  return (
    <Card sx = {{ boxShadow: "none" }} >
      <Box p={2}>
        <MyBox
          color={theme.palette.font.main}
          fontSize={theme.typography.heading.fontSize}
          fontFamily={theme.typography.h5.fontFamily}
          fontWeight={theme.typography.h5.fontWeight}
          textTransform="capitalize"
        >
          platform settings
        </MyBox>
      </Box>
      <Box p={2}>
        <MyBox
          color={theme.palette.font.main}
          fontSize={theme.typography.subHeading.fontSize}
          fontFamily={theme.typography.h6.fontFamily}
          fontWeight={theme.typography.h6.fontWeight}
          textTransform="uppercase"
        >
            account
        </MyBox>
      </Box>
    </Card>
  );
};

export default PlatformSettings;
