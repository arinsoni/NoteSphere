import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./context/app/AppState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
);
