import React from "react";
import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledBox = styled(MuiBox)(({ theme, color, fontSize, fontFamily, fontWeight }) => ({
  // Use the color and fontSize props directly
  color: color,
  fontSize: fontSize,
  fontFamily: fontFamily,
  fontWeight: fontWeight
 
  //breakpoints for responsive styling
//   [theme.breakpoints.up("sm")]: {
//     fontSize: theme.typography.h4.fontSize,
//   },
}));

const MyBox = ({
  width,
  height,
  bgColor,
  hoverColor,
  hoverOpacity,
  display,
  alignItems,
  justifyContent,
  padding,
  border,
  borderRadius,
  boxShadow,
  textTransform,
  sx,
  ...restProps // will allow to add additional valid props to MuiBox
}) => {
  const opacityArray = Array.isArray(hoverOpacity)
    ? hoverOpacity
    : [hoverOpacity];

  return (
    <StyledBox
      sx={{
        width: width,
        maxWidth: "100%",
        height: height,
        backgroundColor: bgColor,
        "&hover": {
          backgroundColor: hoverColor,
          opacity: opacityArray.join(","),
        },
        display: display,
        flexGrow: 1,
        alignItems: alignItems,
        justifyContent: justifyContent,
        padding: padding,
        border: border,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        textTransform: textTransform,
        ...sx, // spreading the sx prop to merge the custom styles
      }}
      {...restProps}
    />
  );
};

export default MyBox;
