import React, { useContext, useEffect, useState } from "react";
import MainPage from "../mainPage";
//alert

import appContext from "../../context/app/appContext";
import Dashboard from "../Dashboard";
// import MyBio from "./components/MyBio";
// import AboutWebsite from "../About/components/AboutWebsite";
// import FutureGoals from "./components/FutureGoals";

const About = () => {
  
  const {  setValue } = useContext(appContext);
  
  useState(() =>{
    setValue(1);
  })
  return (
    <MainPage>
      {/* <Dashboard child_1={<MyBio/>} child_2={<AboutWebsite/>} child_3={<FutureGoals/>} /> */}
    </MainPage>
  );
};

export default About;
