import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import userContext from "../context/user/userContext"

const NavBar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();


  const { user } = useContext(userContext);
  console.log(`user state : ${user}`)
  


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      
      const json = await response.json();
      
      if (json.success) {
        // User deletion successful, perform any necessary cleanup or redirects
        localStorage.removeItem('token', json.token)
        
        navigate("/login");
        props.showAlert("Deleted ", "success");
        
      } else {
        // User deletion failed, display an error message or handle the failure
        console.log(json.message);
      }
    } catch (error) {
      // Error occurred during the deletion process, handle the error
      console.log(error);
    }
  };
  


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          NoteSphere
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === 'home' ? 'active' : 'nav-link'}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === 'about' ? 'active' : 'nav-link'}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" role="button" to="/login" aria-disabled="true">
                Log In
              </Link>
              <Link className="btn btn-primary mx-2" role="button" to="/signup" aria-disabled="true">
                Sign Up
              </Link>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              {/* <span className="mx-2">Logged in as: {email}</span> */}
              <button className="btn btn-primary mx-2" onClick={handleLogout} aria-disabled="true">
                Log Out
              </button>
              <button className="btn btn-primary mx-2" onClick={handleDelete} aria-disabled="true">
                Delete Account
              </button>
            </div>
          )}
          {user && (
          <div className="d-flex align-items-center">
            <span className="mx-2">Logged in as: {user.email}</span>
            <button className="btn btn-primary mx-2" onClick={handleLogout} aria-disabled="true">
              Log Out
            </button>
          </div>
        )}


        </div>
      </div>
    </nav>
  );
};

export default NavBar;
