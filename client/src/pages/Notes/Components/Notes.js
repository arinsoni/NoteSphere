import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//context
import noteContext from "../../../context/notes/noteContext";
import userContext from "../../../context/user/userContext";
import appContext from "../../../context/app/appContext";

//My Componnets
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {
  StyledTextField,
  RootContainer,
  SubmitButton,
} from "./NotesComponents";

//MUI Components
import { Modal, Box } from "@mui/material";
import Grid from "@mui/material/Grid";


const Notes = (props) => {
  //Note Context
  const NoteContext = useContext(noteContext);
  const { notes, getNotes, editNote, isFetching } = NoteContext;
  
  //user context
  const user_context = useContext(userContext);
  const { user, getUser, deleteOrphanedNotes } = user_context;

  //app context
  const { showAlert } = useContext(appContext)

  // Initiallisation of note
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  //for modal
  const [open, setOpen] = useState(false);

  // if user got delted from database
  let navigate = useNavigate();
  const checkUserStatus = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/checkuserstatus",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // Include the user's token in the request headers
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        deleteOrphanedNotes();
        navigate("/signup"); // Redirect to the about page if user status is not successful
      }
    } catch (error) {
      console.log("Error checking user status:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkUserStatus();
      getUser();
    }, 1000); // Check every 1 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  // update note
  const updateNote = (currentNote) => {
    setOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setOpen(false);
    showAlert(1, "Updated Succesfully");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RootContainer
              sx={{
                maxWidth: "400px",
                width: "80%",
                maxHeight: "80%",
                overflow: "auto",
              }}
            >
              <StyledTextField
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                id="etitle"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
              />

              <StyledTextField
                label="Description"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                id="edescription"
                value={note.edescription}
                name="edescription"
                onChange={onChange}
              />

              <StyledTextField
                label="Tag"
                fullWidth
                margin="normal"
                variant="outlined"
                id="etag"
                value={note.etag}
                name="etag"
                onChange={onChange}
              />

              <SubmitButton
                type="submit"
                variant="contained"
                onClick={handleClick}
              >
                Submit
              </SubmitButton>
            </RootContainer>
          </Modal>

          <AddNote/>
          <Grid container spacing={2} alignItems="center" margin="0">
            {notes.length === 0 && "No notes available"}
            {notes.map((note) => {
              return (
                <Grid item xs={12} md={6} xl={4}>
                  <NoteItem
                  key={note._id}
                  note={note}
                  
                  updateNote={updateNote}
                />
                </Grid>
                
              );
            })}
            {user && user.firstName && <p>Name: {user.verified}</p>}
            {user && user.firstName && <p>Name: {user.firstName}</p>}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Notes;
