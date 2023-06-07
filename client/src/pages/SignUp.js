import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";




const SignUp = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    

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
            const { firstName, email, password, cpassword } = values
            const response = await fetch("http://localhost:5000/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, email, password, cpassword })
            })
            
            const json = await response.json()
            
            if (json.success) {
                
                
                
                navigate('/login?email=' + encodeURIComponent(values.email));

                props.showAlert("Account created succesfully", "success")
            } else {
                alert(json.message, "error")
                props.showAlert("Invalid details", "danger")
            }
    
        }
    })
    const { errors, touched, handleSubmit, getFieldProps, handleChange, values, handleBlur } = formik;
    useEffect(() => {
        if (values.email) {
          setEmail("");
        }
        document.getElementById("email").value = "";
      }, [values.email]);
      
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                <label htmlFor="firstName" >Name</label>
                    <input {...getFieldProps('firstName')}
                        color="secondary" label="Name" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="firstName" name='firstName' value={values.firstName} />
                        { errors.firstName && touched.firstName ? <p className='form-error' >{errors.firstName}</p> : null}
                </div>
                <div className="mb-4">
                <label htmlFor="email" >Email</label>
                    <input {...getFieldProps('email')}
                        color="secondary" label="Email" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="email" name='email' value={values.email} />
                        { errors.email && touched.email ? <p className='form-error' >{errors.email}</p> : null}
                </div>
                
                <div className="mb-4">
                <label htmlFor="password" >password</label>
                    <input {...getFieldProps('password')}
                        color="secondary" label="Password" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="password" name='password' value={values.password} />
                        { errors.password && touched.password ? <p className='form-error' >{errors.password}</p> : null}
                </div>
                <div className="mb-4">
                <label htmlFor="cpassword" >cpassword</label>
                    <input {...getFieldProps('cpassword')}
                        color="secondary" label="Password" variant="outlined" onChange={handleChange} onBlur={handleBlur} id="cpassword" name='cpassword' value={values.cpassword} />
                        { errors.cpassword && touched.cpassword ? <p className='form-error' >{errors.cpassword}</p> : null}
                </div>

    
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp


