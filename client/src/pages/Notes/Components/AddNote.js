import { useContext, useState } from "react";

// MUI Compo
import styled from "@emotion/styled";

//Notes Components
import {
  StyledTextField,
  RootContainer,
  SubmitButton,
} from "./NotesComponents";

// Context
import noteContext from "../../../context/notes/noteContext";
import appContext from "../../../context/app/appContext";

const AddNote = (props) => {
  //app context
  const AppContext = useContext(appContext);
  const { theme, themeMode, showAlert } = AppContext;

  //user context
  const context = useContext(noteContext);
  const { addNote } = context;

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

  return (
    <div>
      <div className="container my-3">
        <div className="container my-3">
          <Heading>Add A Note</Heading>
        </div>
      </div>
      <RootContainer sx={{ maxWidth: "600px", margin: "0 auto" }}>
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
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
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
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
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
              color: theme === "dark" ? "#fff" : "#4f4f4f",
            },
          }}
          InputProps={{
            style: {
              color: theme === "dark" ? "#fff" : "#000",
              background: theme === "dark" ? "#333" : "#fff",
            },
          }}
        />
        <SubmitButton type="submit" variant="contained" onClick={handleAddNote}>
          Submit
        </SubmitButton>
      </RootContainer>

      <div className="container my-3">
        <h1 style={{ color: theme === "dark" ? "#fff" : "#202940" }}>
          Your Notes
        </h1>
      </div>
    </div>
  );
};

export default AddNote;
