import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import userContext from '../context/user/userContext';
import LoadingBar from 'react-top-loading-bar'


const ResetPassword = (props) => {
    const navigate = useNavigate();
    const { resetToken } = useParams();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const user_context = useContext(userContext);

    const { user, setProgress } = user_context;
    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email)
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(30)
        // console.log(`${localStorage.getItem('token')} - reset`)
        // Send the password reset request to the backend
        const response = await fetch(`http://localhost:5000/auth/resetPassword/${resetToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ password, confirmPassword, email, resetToken }),
        })
        setProgress(60)
        const json = await response.json();

        setProgress(80)
        if (json.success) {
            props.showAlert(`${json.message}`, "success");
            localStorage.setItem('token', json.token);
            navigate("/login");
        } else {
            props.showAlert(`${json.message}`, "success");
        }
        setProgress(100)

    };


    return (
        <>

            <div>

                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>

            </div>

        </>
    );
}


export default ResetPassword;
