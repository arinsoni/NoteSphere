import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ firstName: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, email, password } = credentials
        const responnse = await fetch("http://localhost:5000/auth/register", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, email, password })
        });
        const json = await responnse.json();
        console.log(json)
        if (json.success) {
            // Save token in local storage and redirect
            localStorage.setItem('token', json.token);
            navigate("/");
            props.showAlert("Account created succesfully", "success")
        }
        else {
            props.showAlert("Invalid details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">firstName</label>
                    <input type="text" className="form-control" id="firstName" name='firstName' onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
