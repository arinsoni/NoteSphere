import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//MUI Components
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import Alert from "@mui/joy/Alert/Alert";

//context

import user_context from "../context/user/userContext";
import appContext from "../context/app/appContext";

//assets
import signup_bg from "../assets/images/signup_bg.jpg";

//My Components
import MyBox from "../components/MyBox";

const LogIn = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get("email") || "";
  //app context
  const { setProgress, showAlert, theme, setShowNav } = useContext(appContext);

  //hiding navbar
  useEffect(() => {
    setShowNav(false);
  }, []);

  // user context
  const userContext = useContext(user_context);
  const [isLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  // formik Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/.*@.*/, "Email must contain the @ symbol"),
    password: Yup.string()
      .required()
      .min(4)
      .matches(
        /^[a-z0-9]+$/i,
        "Password should contain alphabets and numbers only"
      ),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: initialEmail,
      password: "",
    },

    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      setProgress(30);

      const { email, password } = values;
      const response = await fetch("https://note-sphere.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setProgress(60);

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("email", credentials.email);
        showAlert(0, "Logged In Succesfully");

        // Fetch user data after successful login
        await userContext.getUser();
        if (json.data.user.id) {
          navigate(`/${json.data.user.id}/noteboard`);
        }
      } else {
        showAlert(1, json.message);
      }
      setProgress(100);
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    handleChange,
    values,
    handleBlur,
  } = formik;



  return (
    <div>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
<>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${signup_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 5,
            width: "calc(100%-2rem)",
            minHeight: "35vh", //35% of the height of the viewport,
            marginRight: "16px",
            marginLeft: "16px",
            marginTop: "16px",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "-100px",
          paddingLeft: "8px",
          paddingRight: "8px",
          width: "calc(100%-2rem)", //subtracting 2rem from the container's width, rem = font-size of the root element 
          marginLeft: "16px",
          marginRight: "16px",
          
          
        }}
      >
        <Grid
          container
          
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "calc(100% + 8px)",
            
          }}
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {/* Paper being by default responsive so --> */}
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                wordWrap: "break-word",
                
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                  marginLeft: "16px",
                  marginRight: "16px",
                  marginTop: "-24px",
                  padding: "24px",
                  marginBottom: "8px",
                  textAlign: "center",
                  opacity: 1,
                  borderRadius: 3
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{
                    textTransform: "capitalize",
                    fontSize: "20px",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  Join us Today
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{
                    color: "#344767",
                    textTransform: "capitalize",
                    fontSize: "15px",
                    color: "white",
                    fontWeight: 300,
                  }}
                >
                  Enter your credentials to Sign-Up
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "transparent",
                  marginLeft: "16px",
                  marginRight: "16px",
                  marginTop: "-24px",
                  marginBottom: "8px",
                  paddingTop: "32px",
                  paddingBottom: "24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  textAlign: "center",
                  opacity: 1,
                }}
              >
                <form onSubmit={handleSubmit}>
                <TextField
                  {...getFieldProps("email")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  name="email"
                  value={values.email || initialEmail}
                  label="E-Mail Id"
                  fullWidth
                  size="small"
                  color="primary"
                  variant="outlined"
                  margin="normal" // Added: Apply normal margin
                  InputLabelProps={{
                    shrink: true, // Added: Shrink the label when input is focused or filled
                  }}
                  inputProps={{
                    autoComplete: "off", // Add this line to disable auto-complete
                    autoComplete: "new-password",
                  }}
                />
                {errors.email && touched.email ? (
                  <Alert severity="error">{errors.email}</Alert>
                ) : null}
                <TextField
                  {...getFieldProps("password")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  fullWidth
                  size="small"
                  color="primary"
                  variant="outlined"
                  margin="normal" // Added: Apply normal margin
                  InputLabelProps={{
                    shrink: true, // Added: Shrink the label when input is focused or filled
                  }}
                  InputProps={{
                    //  used to put something at the end of input field
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && touched.password ? (
                  <Alert severity="error">{errors.password}</Alert>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                    borderRadius: "5px",
                    border: "none",
                    width: "100%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    marginTop: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </form>

               
                <Typography
                  p={3}
                  variant="body2"
                  gutterBottom
                  style={{
                    textTransform: "capitalize",
                    fontSize: "15px",
                    color: "#344767",
                    fontWeight: 300,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Don't have an account? <Link to="/signup">Sign-Up</Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>



       
      )}
    </div>
  );
};

export default LogIn;
