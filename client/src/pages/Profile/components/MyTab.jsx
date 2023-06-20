import React, { useContext } from "react";
import app_context from "../../../context/app/appContext";
import Tab from "@mui/material/Tab";

const MyTab = ({ label, icon, ht }) => {
  const AppContext = useContext(app_context);
  const { theme } = AppContext;
  const SelectedIcon = icon;
  const fontSize = ht ? theme.typography[`h${ht}`].fontFamily : "";
  const fontFamily = ht ? theme.typography[`h${ht}`].fontWeight : "";
  const fontWeight = ht ? theme.typography[`h${ht}`].fontSize : "";

  return (
    <>
      <Tab
        style={{
          color: theme.palette.font.main,
          opacity: 1,
          fontFamily: {fontSize},
          fontWeight : {fontWeight},
          fontSize: {fontSize},
        }}
        label={
          <div style={{ display: "inline-block" }}>
            <SelectedIcon
              style={{
                verticalAlign: "middle",
                marginRight: "0.5rem",
              }}
            />
            <span style={{ verticalAlign: "middle" }}>{label}</span>
          </div>
        }
      />
    </>
  );
};

export default MyTab;
