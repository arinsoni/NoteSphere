import React, { useContext, useEffect } from "react";
import user_context from "../context/user/userContext";
import MainPage from "./mainPage";
//alert
import MyAlert from "../components/Alert";

import appContext from "../context/app/appContext";

const About = (props) => {
  const userContext = useContext(user_context);
  const { user } = userContext;

  const AppContext = useContext(appContext);
  const { showAlert } = AppContext;
  const handleClick = () => {
    showAlert(1, "hello")
  };

  return (
    <MainPage>
      <div>
        This is about section
        {user && user.name ? (
          <p>Name: {user.name}</p>
        ) : (
          <p>
            {" "}
            <a href="/signup"> Sign Up</a> or <a href="/login">Log In</a>
          </p>
        )}
      </div>

      <button onClick={handleClick}>Click me</button>
    </MainPage>
  );
};

export default About;
