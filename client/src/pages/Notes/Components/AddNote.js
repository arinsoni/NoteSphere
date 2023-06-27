import { useContext, useState } from "react";

// MUI Compo
import styled from "@emotion/styled";
//icons
import AddIcon from "@mui/icons-material/Add";

//Notes Components
import {
  StyledTextField,
  RootContainer,
  SubmitButton,
} from "./NotesComponents";

// Context
import noteContext from "../../../context/notes/noteContext";
import appContext from "../../../context/app/appContext";
import { Card, IconButton, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import MyBox from "../../../components/MyBox";

const AddNote = () => {
  //app context
  const AppContext = useContext(appContext);
  const { theme, themeMode, showAlert } = AppContext;

  //user context
  const NoteContext = useContext(noteContext);
  const { addNote, notes, addNoteForm, handleCloseAddNoteForm } = NoteContext;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleAddNote = async (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert(0, "Note added Successfully");
    handleCloseAddNoteForm();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const Heading = styled("h1")(({ theme }) => ({
    color: themeMode === "dark" ? "#fff" : "#202940",
    fontFamily: "Arial, sans-serif",
    fontSize: "3vw", // Responsive font size based on viewport width
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "24px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  }));

  console.log("Length of notes : " + notes.length);

  return (
    <div>
      <Modal
        open={addNoteForm}
        onClose={handleCloseAddNoteForm}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <MyBox
            width={70}
            height={70}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            borderRadius="50%"
            color= {theme.palette.primary.main}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              backgroundSize: "cover", // to cover the given area
              backgroundPosition: "center", // to show image completely
            }}
          >
            <AddIcon />
          </MyBox>
          <RootContainer sx={{ minWidth: "40vw", margin: "0 auto", mt: -5, border: `2px solid ${theme.palette.font.dark}`, }}>
            <StyledTextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              InputLabelProps={{
                style: {
                  color: theme.palette.secondary.dark,
                },
              }}
              InputProps={{
                style: {
                  color: theme.palette.font.main,
                  background: theme.palette.primary.main,
                },
              }}
            />
            <StyledTextField
              label="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              id="description"
              value={note.description}
              name="description"
              onChange={onChange}
              InputLabelProps={{
                style: {
                  color: theme.palette.secondary.dark,
                },
              }}
              InputProps={{
                style: {
                  color: theme.palette.font.main,
                  background: theme.palette.primary.main,
                },
              }}
            />
            <StyledTextField
              label="Tag"
              fullWidth
              margin="normal"
              variant="outlined"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
              InputLabelProps={{
                style: {
                  color: theme.palette.secondary.dark,
                },
              }}
              InputProps={{
                style: {
                  color: theme.palette.font.main,
                  background: theme.palette.primary.main,
                },
              }}
            />
            <SubmitButton
              type="submit"
              variant="contained"
              onClick={handleAddNote}
            >
              Submit
            </SubmitButton>
          </RootContainer>
        </div>
      </Modal>
      {notes.length > 0 && (
        <div className="container my-3">
          <Heading>Your Notes</Heading>
        </div>
      )}
    </div>
  );
};

export default AddNote;
