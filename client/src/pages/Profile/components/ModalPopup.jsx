import React from "react";

// Profile Components
import {
    RootContainer,
    StyledTextField,
    SubmitButton,
} from "../../Notes/Components/NotesComponents";
import StyleBox from "./StyleBox";

// MUI Compinents
import { Card, Box, Modal } from "@mui/material";


const ModalPopup = ({ open, onClose, onYesClick, onNoClick, msg }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          {msg}
        </StyleBox>
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <SubmitButton onClick={onYesClick}>Yes</SubmitButton>
          <SubmitButton onClick={onNoClick}>
            No
          </SubmitButton>
        </Box>
      </RootContainer>
    </Modal>
  );
};

export default ModalPopup;
