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
  // useEffect(() => {
  //   {
  //     props.showAlert("Logged In successfully");
  //   }
  // });

  return (
    <MainPage>
      <div>
        This is about section
        {user && user.firstName ? (
          <p>Name: {user.firstName}</p>
        ) : (
          <p>
            {" "}
            <a href="/signup"> Sign Up</a> or <a href="/login">Log In</a>
          </p>
        )}
      </div>
    </MainPage>
  );
};

export default About;
