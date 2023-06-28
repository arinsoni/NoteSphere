import React, { useContext, useEffect, useState } from "react";
// Profile Components
import {
  RootContainer,
  StyledTextField,
  SubmitButton,
} from "../../Notes/Components/NotesComponents";

// MUI Compinents
import { Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//context
import appContext from "../../../context/app/appContext";

const ModalForm = ({
  open,
  onClose,

  label_1 = null,
  value_1,
  fun_1,
  isPassword_1 = false,

  label_2 = null,
  value_2,
  fun_2,
  isPassword_2 = false,

  label_3 = null,
  value_3,
  fun_3,
  isPassword_3 = false,

  onSubmit,
}) => {
    //app context
  const AppContext = useContext(appContext);
  const { theme, themeMode } = AppContext;

  // hide password
  const [showPassword_1, setShowPassword_1] = useState(false);
  const [showPassword_2, setShowPassword_2] = useState(false);
  const [showPassword_3, setShowPassword_3] = useState(false);
  useEffect(() => {
    if(!isPassword_1){
      setShowPassword_1(true)
    }
  })
  useEffect(() => {
    if(!isPassword_2){
      setShowPassword_2(true)
    }
  })
  useEffect(() => {
    if(!isPassword_3){
      setShowPassword_3(true)
    }
  })

  const handleClickShowPassword_1 = () => setShowPassword_1((show) => !show);
  const handleClickShowPassword_2 = () => setShowPassword_2((show) => !show);
  const handleClickShowPassword_3 = () => setShowPassword_3((show) => !show);

  const handleMouseDownPassword_1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword_2 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword_3= (event) => {
    event.preventDefault();
  };


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
          type={showPassword_1  ? "text" : "password"}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_1}
          onChange={(e) => fun_1(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.palette.secondary.dark,
            },
          }}
          InputProps={{
            style: {
              color: theme.palette.font.main,
              background: theme.palette.primary.main
            },
          
            //  used to put something at the end of input field
            endAdornment: (
              
              <InputAdornment position="end">
                {isPassword_1 && <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword_1}
                  onMouseDown={handleMouseDownPassword_1}
                  edge="end"
                >
                  {showPassword_1 && isPassword_1  ? <VisibilityOff /> : <Visibility />}
                </IconButton>}
              </InputAdornment>
              
            ),
          }}
        />
        {label_2 && 
        <StyledTextField
          label={label_2}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_2}
          type={showPassword_2  ? "text" : "password"}
          onChange={(e) => fun_2(e.target.value)}
          InputLabelProps={{
            style: {
              color: themeMode === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme.palette.font.main,
              background: theme.palette.primary.main
            },
            endAdornment: (
              
              <InputAdornment position="end">
                {isPassword_2 && <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword_2}
                  onMouseDown={handleMouseDownPassword_2}
                  edge="end"
                >
                  {showPassword_2 && isPassword_2  ? <VisibilityOff /> : <Visibility />}
                </IconButton>}
              </InputAdornment>
              
            ),
          }}
        />}
        {label_3 &&
        <StyledTextField
          label={label_3}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value_3}
          type={showPassword_3  ? "text" : "password"}
          onChange={(e) => fun_3(e.target.value)}
          InputLabelProps={{
            style: {
              color: themeMode === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: themeMode === "dark" ? "#fff" : "#000",
              background: themeMode === "dark" ? "#333" : "#fff",
            },
            endAdornment: (
              
              <InputAdornment position="end">
                {isPassword_2 && <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword_3}
                  onMouseDown={handleMouseDownPassword_3}
                  edge="end"
                >
                  {showPassword_3 && isPassword_3  ? <VisibilityOff /> : <Visibility />}
                </IconButton>}
              </InputAdornment>
              
            ),
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
