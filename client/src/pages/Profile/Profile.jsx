import React, { useContext, useState } from "react";
import Dashboard from "../Dashboard";
import AccountSettings from "./components/AccountSettings";
import ProfileInfoCard from "./components/ProfileInfoCard";
import AdditionalFeatures from "./components/AdditionalFeatures";
import MainPage from "../mainPage";
import appContext from "../../context/app/appContext";

const Profile = () => {
  const {setValue} = useContext(appContext)
  useState(() =>{
    setValue(0);
  })
  return (
    <MainPage>
      <Dashboard
        child_1={<AccountSettings />}
        child_2={<ProfileInfoCard />}
        child_3={<AdditionalFeatures />}
        value={0}
      />
    </MainPage>
  );
};

export default Profile;
