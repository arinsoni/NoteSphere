import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//My Components
import MyBox from "../components/MyBox";

//MUI Components
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography, Box, Card, CardContent, TextField } from "@mui/material";
import Alert from "@mui/joy/Alert/Alert";

//context
import appContext from "../context/app/appContext";

//assets
import signup_bg from "../assets/images/signup_bg.jpg";

const SignUp = (props) => {
  //app context
  const { setProgress, showAlert, theme, setShowNav } = useContext(appContext);

  //hiding navbar
  useEffect(() => {
    setShowNav(false);
    return setShowNav(true);
  }, []);

  // hide passwords
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };

  // formik Schema
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required()
      .min(3)
      .max(25)
      .matches(
        /^[a-z0-9\s]+$/i,
        "Name should contain alphabets and numbers only"
      ),
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
    cpassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      cpassword: "",
    },

    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      setProgress(30);
      console.log("inside register function");
      const { firstName, email, password, cpassword } = values;
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, email, password, cpassword }),
      });
      setProgress(60);

      const json = await response.json();
      showAlert(0, "Email has been sent to  your mail id ");
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
        borderRadius="20px"
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
          borderRadius: "15px",
          border: `2px solid ${theme.palette.font.dark}`,
          mx: "auto", // Center the card horizontally
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              {...getFieldProps("firstName")}
              onChange={handleChange}
              onBlur={handleBlur}
              id="firstName"
              name="firstName"
              value={values.firstName}
              label="Name"
              fullWidth
              size="small"
              color="primary"
              variant="outlined"
              margin="normal" // Added: Apply normal margin
              InputLabelProps={{
                shrink: true, // Added: Shrink the label when input is focused or filled
                autoComplete: "off",
              }}
            />
            {errors.firstName && touched.firstName ? (
              <Alert severity="error">{errors.firstName}</Alert>
            ) : null}
            <TextField
              {...getFieldProps("email")}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              name="email"
              value={values.email}
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
            <TextField
              {...getFieldProps("cpassword")}
              onChange={handleChange}
              onBlur={handleBlur}
              id="cpassword"
              name="cpassword"
              type={showCPassword ? "text" : "password"}
              label="Confirm Password"
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
                      onClick={handleClickShowCPassword}
                      onMouseDown={handleMouseDownCPassword}
                      edge="end"
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.cpassword && touched.cpassword ? (
              <Alert severity="error">{errors.cpassword}</Alert>
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
                color: theme.palette.font.dark,
                    cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
          <Typography
            variant="body2"
            gutterBottom
            style={{
              textTransform: "capitalize",
              fontSize: "15px",
              color: theme.palette.font.main,
              fontWeight: 300,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
