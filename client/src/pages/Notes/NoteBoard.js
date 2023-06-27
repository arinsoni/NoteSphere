import React, { useContext } from "react";

//My Components
import MainPage from "../mainPage";
import Notes from "./Components/Notes";

// MUI Components
import { Box } from "@mui/system";

//icons
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// context
import noteContext from "../../context/notes/noteContext";
import appContext from "../../context/app/appContext";
import { Rotate90DegreesCcw } from "@mui/icons-material";

//assets
import noteImg from "../../assets/images/note.png";

const NoteBoard = () => {
  //Note Context
  const NoteContext = useContext(noteContext);
  const { handleOpenAddNoteForm, addNoteForm, notes } = NoteContext;

  //userContext
  const { theme } = useContext(appContext);

  //icon
  const SelectedIcon = addNoteForm ? ClearIcon : AddIcon;

  return (
    <Box position="relative">
      <MainPage>
        <Notes />
      </MainPage>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={60}
        height={60}
        borderRadius="50%"
        bgcolor={theme.palette.secondary.dark}
        position="fixed"
        bottom="0"
        right="0"
        mx={2}
        my={2}
      >
        <IconButton>
          <AddIcon
            style={{
              color: theme.palette.primary.main,
              transform: addNoteForm && "rotate(45deg)",
              transition: "transform 0.3s ease",
            }}
            onClick={handleOpenAddNoteForm}
          />
        </IconButton>
      </Box>
      {notes.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={300}
          height={300}
          borderRadius="50%"
          position="fixed"
          top="calc(50% - 150px)" // Adjusted top value
          left="calc(50% - 150px)"
          mx={2}
          my={2}
        >
          <img
            height="100%"
            width="100%"
            src={noteImg}
            alt="Add your first note"
            onClick={handleOpenAddNoteForm}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default NoteBoard;
