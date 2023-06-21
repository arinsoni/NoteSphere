import React, { useState } from 'react'

const ForgotPassword = (props) => {
    const [credentials, setCredentials] = useState({ email: "" });
    const [msg, setMsg] = useState("")
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("forgotinng")
        const response = await fetch("http://localhost:5000/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email }),
        })
        const json = await response.json();
        if (json.success) {
            // localStorage.setItem('verificationToken', json.verificationToken)
            props.showAlert(json.message, "success");
            setMsg("Click the link sent to your mail id")
          } else {
            props.showAlert(json.message, "error");
          }
    }
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
                {msg}
            </form>
        </div>
    )
}

export default ForgotPassword