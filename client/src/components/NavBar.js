import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {

    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">NoteSphere</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "home" ? "acitve" : "nav-link"}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "about" ? "acitve" : "nav-link"}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? 
                    <form className="d-flex">

                        <Link className="btn btn-primary mx-2" role="button" to="/login" aria-disabled="true">Log In</Link>
                        <Link className="btn btn-primary mx-2" role="button" to="/signup" aria-disabled="true">Sign Up</Link>

                    </form> : <button className="btn btn-primary mx-2"  onClick={handleLogout} aria-disabled="true">Log Out</button> }



                </div>
            </div>
        </nav>
    )
}

export default NavBar
