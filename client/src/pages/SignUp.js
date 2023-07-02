import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//My Components
import MyBox from "../components/MyBox";
import {
  Heading,
  RootContainer,
  StyledTextField,
  SubmitButton,
} from "../pages/Notes/Components/NotesComponents";

//MUI Components
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography, Box, TextField, Modal, Grid, Paper } from "@mui/material";
import Alert from "@mui/joy/Alert/Alert";

//context
import appContext from "../context/app/appContext";

//assets
import signup_bg from "../assets/images/signup_bg.jpg";

const SignUp = () => {
  //app context
  const { setProgress, showAlert, theme, setShowNav } = useContext(appContext);

  //hiding navbar
  useEffect(() => {
    setShowNav(false);
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
  const [resendOTPDisplay, setResendOTPDisplay] = useState("none");
  const [verificationDisplay, setVerificationDisplay] = useState("block");

  // formik Schema
  const registerSchema = Yup.object().shape({
    name: Yup.string()
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

  // OTP model
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [otp, setOtp] = useState(Array(6).fill("")); // otp with 6 digits, initially all empty strings
  const [email, setEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },

    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setProgress(30);
      const { name, email, password } = values;
      const response = await fetch("http://localhost:5000/auth/register-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      setProgress(60);

      const json = await response.json();
      if (json.success) {
        setProgress(100);
        setEmail(email);
        handleOpen();
        setStart(true);
        setTime(40);
      } else {
        showAlert(2, json.message);
      }
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

  let navigate = useNavigate();
  const handelOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/auth/register-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otp.join("") }),
        }
      );
      console.log(response);

      const json = await response.json();

      if (json.success) {
        navigate("/login");
      } else {
        showAlert(2, json.message);
      }
    } catch (error) {
      showAlert(2, error);
    }
  };

  const inputRefs = useRef([]); // created an object storing refrences to the each output digit

  const handleOTPChange = (index, value) => {
    setOtp((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register-resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();

      if (json.success) {
        showAlert(0, json.message);
        setResendOTPDisplay("none")
        setVerificationDisplay("block")
      } else {
        showAlert(2, json.message);
      }
    } catch (error) {
      showAlert(2, error)
    }
  };

  // Live timer
  const [time, setTime] = useState(90);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (time >= 0 && start) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      if (time === 30) {
        showAlert(1, `Only ${time} seconds left`);
      }
      if (time === 0) {
        showAlert(2, "OTP expired, Sign-Up again");
        setResendOTPDisplay("block")
        setVerificationDisplay("none")
        setStart(false);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, open]);

  

  return (
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
                  borderRadius: 3,
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
                <Modal
                  open={open}
                  onClose={handleClose}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RootContainer sx={{ width: "400px", margin: "0 auto" }}>
                    <Box
                      fontSize="24px"
                      fontFamily={theme.typography.h1.fontFamily}
                      textAlign="center"
                      fontWeight={theme.typography.weight.medium.fontWeight}
                    >
                      Check your email!
                    </Box>
                    <Box
                      pt={2}
                      fontSize="13px"
                      fontFamily={theme.typography.h1.fontFamily}
                      textAlign="center"
                      fontWeight={theme.typography.weight.normal.fontWeight}
                    >
                      Please enter 6-digit verification OTP sent to your email
                      id: <br />
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{
                          color: "#344767",
                          textTransform: "capitalize",
                          fontSize: "15px",

                          fontWeight: 300,
                        }}
                      >
                        The code is valid for {time} secs
                      </Typography>
                    </Box>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {Array.from(
                        { length: 6 },
                        (
                          _,
                          index // '_' is value
                        ) => (
                          <TextField
                            key={index}
                            id={`otp-${index}`}
                            name={`otp-${index}`}
                            value={otp[index]}
                            onChange={(e) =>
                              handleOTPChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            variant="outlined"
                            size="small"
                            style={{ width: "40px", margin: "5px" }}
                            inputProps={{
                              maxLength: 1,
                              style: { textAlign: "center" },
                            }}
                            inputRef={(ref) => {
                              inputRefs.current[index] = ref;
                            }}
                          />
                        )
                      )}
                    </div>
                    
                    <SubmitButton
                      type="submit"
                      variant="contained"
                      onClick={handleResend}
                      sx={{
                        display: resendOTPDisplay
                      }}
                    >
                      Resend OTP
                    </SubmitButton>
              
                    
                    <SubmitButton
                      type="submit"
                      variant="contained"
                      onClick={handelOTP}
                      sx={{
                        display: verificationDisplay
                      }}
                    >
                      Submit
                    </SubmitButton>
                  </RootContainer>
                </Modal>

                <form onSubmit={handleSubmit}>
                  <TextField
                    {...getFieldProps("name")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    value={values.name}
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
                  {errors.name && touched.name ? (
                    <Alert severity="error">{errors.name}</Alert>
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
                    // inputProps={{
                    //   autoComplete: "off", // Add this line to disable auto-complete
                    //   autoComplete: "new-password",
                    // }}
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
                  Already have an account? <Link to="/login">Login</Link>{" "}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
