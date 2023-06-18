import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";




const CreatePassword = (props) => {
    let navigate = useNavigate();
    // formik params
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
        password: Yup.string().required().min(4).matches(/^[a-z0-9]+$/i, "Password should contain alphabets and numbers only"),
        cpassword: Yup.string().required().oneOf([Yup.ref("password"), null], 'Password must match')
    })

    // formik
    const { createPasswordToken } = useParams();

    const formik = useFormik({
        initialValues: {
            password: "",
            cpassword: ""
        },

        validationSchema: registerSchema,
        onSubmit: async (values) => {
            props.setProgress(30)
            
            const { password } = values
            const response = await fetch(`http://localhost:5000/auth/createPassword/${createPasswordToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ createPasswordToken, password })
            })
            props.setProgress(60)

            const json = await response.json()
            if (json.success) {
                alert("success");
                navigate("/login");
            } else {
                alert(`${json.message}`);
            }
     
            props.setProgress(100)
        }
       
    })
    const { errors, touched, handleSubmit, getFieldProps, handleChange, values, handleBlur } = formik;
    return (
        <div>
            <form onSubmit={handleSubmit}>

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

export default CreatePassword


