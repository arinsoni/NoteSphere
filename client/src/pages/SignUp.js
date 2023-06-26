import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import appContext from '../context/app/appContext';



const SignUp = (props) => {
    //context
    const { setProgress, showAlert } = useContext(appContext)
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
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


    const registerSchema = Yup.object().shape({
        firstName: Yup.string().required().min(3).max(25).matches(/^[a-z0-9]+$/i, "Username should contain alphabets and numbers only"),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(4).matches(/^[a-z0-9]+$/i, "Password should contain alphabets and numbers only"),
        cpassword: Yup.string().required().oneOf([Yup.ref("password"), null], 'Password must match')
    })



    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: "",
            cpassword: ""
        },

        validationSchema: registerSchema,
        onSubmit: async (values, action) => {
            setProgress(30)
            console.log("inside register function")
            const { firstName, email, password, cpassword } = values
            const response = await fetch("http://localhost:5000/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, email, password, cpassword })
            })
            setProgress(60)

            const json = await response.json()

            // if (json.success) {
            //     navigate('/login?email=' + encodeURIComponent(values.email));

                showAlert(1, "Account created succesfully")
            // } else {
            //     alert(json.message, "error")
            //     showAlert("Invalid details", "danger")
            // }
            setProgress(100)
        }
       
    })
    const { errors, touched, handleSubmit, getFieldProps, handleChange, values, handleBlur } = formik;
    // useEffect(() => {
    //     if (values.email) {
    //         setEmail("");
    //     }
    //     document.getElementById("email").value = "";
    // }, [values.email]);

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="firstName" >Name</label>
                    <input {...getFieldProps('firstName')}
                        color="secondary" label="Name" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="firstName" name='firstName' value={values.firstName} />
                    {errors.firstName && touched.firstName ? <p className='form-error' >{errors.firstName}</p> : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" >Email</label>
                    <input {...getFieldProps('email')}
                        color="secondary" label="Email" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="email" name='email' value={values.email} />
                    {errors.email && touched.email ? <p className='form-error' >{errors.email}</p> : null}
                </div>

                <OutlinedInput {...getFieldProps('password')}
                    id="password" name='password' onChange={handleChange} onBlur={handleBlur}
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
                {errors.password && touched.password ? <p className='form-error' >{errors.password}</p> : null}
                <OutlinedInput {...getFieldProps('cpassword')}
                    id="cpassword" name='cpassword' onChange={handleChange} onBlur={handleBlur}
                    type={showCPassword ? "text" : "password"}
                    endAdornment={
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
                    }
                    label="Confirm Password"
                />
                {errors.cpassword && touched.cpassword ? <p className='form-error' >{errors.cpassword}</p> : null}

               

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp


