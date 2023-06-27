import { useContext } from "react";

// MUI Components
import styled from "@emotion/styled";
import { Card, Box, TextField, Button } from "@mui/material";
import appContext from "../../../context/app/appContext";

export const StyledTextField = styled(TextField)(({}) => {
  const { theme } = useContext(appContext);
  return {
    "& .MuiInputLabel-root": {
      color: theme.palette.font.main,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
      "& fieldset": {
        borderColor: theme.palette.secondary.dark,
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.dark,
      },
    },
  };
});

export const RootContainer = styled(Box)(() => {
  const { theme } = useContext(appContext);

  return {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    paddingTop: "34px",
    background: theme.palette.primary.main,
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };
});

export const SubmitButton = styled(Button)(({}) => {
  const { theme } = useContext(appContext);
  return {
    marginTop: "16px",
    background:  theme.palette.secondary.dark,
    color: theme.palette.font.dark,
    fontWeight: "bold",
    opacity: 0.9,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.font.dark,
      opacity: 1
    },
  };
});

export const StyledCard = styled(Card)(() => {
  const { theme } = useContext(appContext)
  return {
  height: "100%",
  marginBottom: "16px", 
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
  position:"relative",
  background: theme.palette.primary.main,
  border: `2px solid ${theme.palette.font.dark}`,
 
}});

export const Heading = styled("h1")(({}) => ({
  fontFamily: "Arial, sans-serif",
  fontSize: "3vw", 
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "24px",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
}));
