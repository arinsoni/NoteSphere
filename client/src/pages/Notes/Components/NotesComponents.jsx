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
    background: theme.palette.secondary.main,
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };
});

export const SubmitButton = styled(Button)(({}) => {
  const { theme } = useContext(appContext);
  return {
    marginTop: "16px",
    background:  theme.palette.alt.light,
    color: theme.palette.font.main,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.font.dark,
      opacity: 0.9,
    },
  };
});

export const StyledCard = styled(Card)(({ themeMode }) => ({
  width: "300px", // Adjust the width as desired
  marginBottom: "16px", // Add some spacing between the cards
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  background: themeMode === "dark" ? "#333" : "#f5f5f5",
}));

export const Heading = styled("h1")(({}) => ({
  fontFamily: "Arial, sans-serif",
  fontSize: "3vw", // Responsive font size based on viewport width
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "24px",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
}));
