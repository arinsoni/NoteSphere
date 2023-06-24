import { useContext } from "react";

// MUI Components
import styled from "@emotion/styled";
import { Card, Box, TextField, Button } from "@mui/material";


export const StyledTextField = styled(TextField)(({}) => ({
  "& .MuiInputLabel-root": {
    color: "#4f4f4f",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "#d0d0d0",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#a0a0a0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#202940",
    },
  },
}));

export const RootContainer = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  background: "#f7f7f7",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "80%",
  maxHeight: "80%",
  overflow: "auto",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  background: "#202940",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#202940",
    opacity: 0.9,
  },
}));

export const StyledCard = styled(Card)(({ themeMode }) => ({
  width: "300px", // Adjust the width as desired
  marginBottom: "16px", // Add some spacing between the cards
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  background: themeMode === "dark" ? "#333" : "#f5f5f5",
}));


export const Heading = styled("h1")(({ themeMode }) => ({
  color: themeMode === "dark" ? "#fff" : "#202940",
  fontFamily: "Arial, sans-serif",
  fontSize: "3vw", // Responsive font size based on viewport width
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "24px",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
}));
