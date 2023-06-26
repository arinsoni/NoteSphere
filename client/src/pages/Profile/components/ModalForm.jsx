import React, { useContext } from "react";
// Profile Components
import {
  RootContainer,
  StyledTextField,
  SubmitButton,
} from "../../Notes/Components/NotesComponents";

// MUI Compinents
import { Modal } from "@mui/material";

//context
import appContext from "../../../context/app/appContext";

const ModalForm = ({
  open,
  onClose,

  label_1 = null,
  value_1,
  fun_1,

  label_2 = null,
  value_2,
  fun_2,

  label_3 = null,
  value_3,
  fun_3,
  onSubmit,
}) => {
    //app context
  const AppContext = useContext(appContext);
  const { theme } = AppContext;
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
      <RootContainer sx={{ width: "400px", margin: "0 auto" }}>
        <StyledTextField
          label={label_1}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_1}
          onChange={(e) => fun_1(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
        {label_2 && 
        <StyledTextField
          label={label_2}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_2}
          onChange={(e) => fun_2(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />}
        {label_3 &&
        <StyledTextField
          label={label_3}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_3}
          onChange={(e) => fun_3(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
}
        <SubmitButton type="submit" variant="contained" onClick={onSubmit}>
          Submit
        </SubmitButton>
      </RootContainer>
    </Modal>
  );
};

export default ModalForm;
