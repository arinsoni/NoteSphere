import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//MUI Components
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography, Box, Card, CardContent, TextField } from "@mui/material";
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
      const response = await fetch("http://localhost:5000/auth/login", {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start", //vertically align
            alignItems: "center", //horizontally align
            height: "100vh",
            flexDirection: "column",
            backgroundColor: "#f0f2f5",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <MyBox
            width="100%"
            maxHeight="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            position="relative"
            margin={3}
            sx={{
              backgroundImage: `url(${signup_bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Box
            width="350px"
            height="140px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            zIndex={999}
            borderRadius="15px"
            sx={{
              background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
              mt: -20,
            }}
          >
            {/* Content */}
            <Typography
              variant="body2"
              gutterBottom
              style={{
                color: theme.palette.font.main,
                textTransform: "capitalize",
                fontSize: "20px",
                color: theme.palette.font.dark,
                fontWeight: 500,
              }}
            >
              Join us Today
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{
                color: theme.palette.font.main,
                textTransform: "capitalize",
                fontSize: "15px",
                color: theme.palette.font.dark,
                fontWeight: 300,
              }}
            >
              Enter your credentials to Sign-Up
            </Typography>
          </Box>

          <Card
            sx={{
              mt: -12,
              position: "relative",
              pt: 12,
              width: "100%", // Set width to 100% for flexibility
              maxWidth: "400px", // Set a maximum width for the card
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
              position: "relative",
              background: theme.palette.primary.main,
              border: `2px solid ${theme.palette.font.dark}`,
              mx: "auto", // Center the card horizontally
            }}
          >
            <CardContent>
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
                  }}
                >
                  Submit
                </button>
              </form>
            </CardContent>
          </Card>
        </Box>

        // <form onSubmit={handleSubmit}>
        //   <div className="mb-3">
        //     <label htmlFor="email" className="form-label">Email address</label>
        //     <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
        //     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //   </div>
        //   <OutlinedInput
        //     id="password" name='password' onChange={onChange}
        //     type={showPassword ? "text" : "password"}
        //     endAdornment={
        //       <InputAdornment position="end">
        //         <IconButton
        //           aria-label="toggle password visibility"
        //           onClick={handleClickShowPassword}
        //           onMouseDown={handleMouseDownPassword}
        //           edge="end"
        //         >
        //           {showPassword ? <VisibilityOff /> : <Visibility />}
        //         </IconButton>
        //       </InputAdornment>
        //     }
        //     label="Password"
        //   />
        //    <Link

        //             aria-current="page"
        //             to={'/auth/forgot-password'}
        //           >
        //             forgot password
        //           </Link>
        //   <button type="submit" className="btn btn-primary">Submit</button>
        // </form>
      )}
    </div>
  );
};

export default LogIn;
