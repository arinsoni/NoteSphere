import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppState from "./context/app/AppState";
import NoteState from "./context/notes/NoteState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppState>
    <NoteState  >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NoteState>
  </AppState>
);
