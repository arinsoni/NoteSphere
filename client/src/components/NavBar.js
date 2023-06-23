import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import user_context from "../context/user/userContext";
import LoadingBar from "react-top-loading-bar";
//contexts
import app_context from "../context/app/appContext";

const NavBar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const userContext = useContext(user_context);
  const { user, progress, setProgress, isLogin, setIsLogin } = userContext;
  const [email, setEmail] = useState("");

  //context
  const AppContext = useContext(app_context);
  const { setShowSideNav, handleSideNav } = AppContext;

  const handleLogout = () => {
    setProgress(50);
    localStorage.removeItem("token");
    navigate("/login");
    setProgress(100);
    setIsLogin(false);
  };

  useEffect(() => {
    if (user && user._id) {
      setId(user._id);
      setEmail(user.email);
    }
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setProgress(40);
    // Send the password change request to the backend
    const response = await fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ email }),
    });
    setProgress(60);
    const json = await response.json();
    setProgress(80);
    if (json.success) {
      // localStorage.setItem('verificationToken', json.verificationToken)
      props.showAlert(json.message, "success");
      localStorage.removeItem("token"); // user cant naviagte back to notes page
      handleLogout();
      setIsLogin(false);
      navigate("/");
    } else {
      props.showAlert(json.message, "error");
    }
    setProgress(100);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (json.success) {
        // User deletion successful, perform any necessary cleanup or redirects
        localStorage.removeItem("token", json.token);

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
    <>
      <div>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "home" ? "active" : "nav-link"
                    }`}
                    aria-current="page"
                    to={`/${id}/noteboard`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "about" ? "active" : "nav-link"
                    }`}
                    to="/"
                  >
                    About
                  </Link>
                  <Link
                    className={`nav-link ${
                      location.pathname === "about" ? "active" : "nav-link"
                    }`}
                    to="/mainpage"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              {!isLogin ? (
                <form className="d-flex">
                  <Link
                    className="btn btn-primary mx-2"
                    role="button"
                    to="/login"
                    aria-disabled="true"
                  >
                    Log In
                  </Link>
                  <Link
                    className="btn btn-primary mx-2"
                    role="button"
                    to="/signup"
                    aria-disabled="true"
                  >
                    Sign Up
                  </Link>
                </form>
              ) : (
                <div className="d-flex align-items-center">
                  {/* <span className="mx-2">Logged in as: {email}</span> */}
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleLogout}
                    aria-disabled="true"
                  >
                    Log Out
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleDelete}
                    aria-disabled="true"
                  >
                    Delete Account
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handlePasswordChange}
                    aria-disabled="true"
                  >
                    Change Pass
                  </button>
                </div>
              )}

              {/* {user} */}
              <button
                className="btn btn-primary mx-2"
                onClick={handleSideNav}
                aria-disabled="true"
              >
                Show Side Nav
              </button>
            </div>
          </div>
        </nav>
        <LoadingBar height={5} color="#f11946" progress={progress} style={{}} />
      </div>
      <div></div>
    </>
  );
};

export default NavBar;
