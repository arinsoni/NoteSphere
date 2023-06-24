import React from "react";


//My Components
import MainPage from "../mainPage";
import Notes from "./Components/Notes";
const NoteBoard = (props) => {
  return (
    <MainPage>
      <Notes showAlert={props.showAlert} />
    </MainPage>
  );
};

export default NoteBoard;
