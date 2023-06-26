import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import user_context from "../context/user/userContext";
import { Link } from 'react-router-dom';
import appContext from "../context/app/appContext"

const LogIn = (props) => {
    // app Context
    const AppContext = useContext(appContext);
   const { showAlert, setProgress } = AppContext;
  const userContext = useContext(user_context);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const location = useLocation();

  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        email: emailParam,
      }));
    }
  }, [location]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(30)
  
    const response = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    setProgress(60)
  
    const json = await response.json();
    setProgress(80)
   
  
    if (json.success) {
      localStorage.setItem('token', json.token);
      localStorage.setItem('email', credentials.email);
     showAlert(0, "Logged In Succesfully")
      
      
      // Fetch user data after successful login
      await userContext.getUser();
      if (json.data.user.id) {
        navigate(`/${json.data.user.id}/noteboard`);
      }
    } else {
      showAlert(2, "Invalid Credentials");
    }
  
    setProgress(100)
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <OutlinedInput
            id="password" name='password' onChange={onChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
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
            }
            label="Password"
          />
           <Link
                 
                    aria-current="page"
                    to={'/auth/forgot-password'}
                  >
                    forgot password
                  </Link>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
};

export default LogIn;
