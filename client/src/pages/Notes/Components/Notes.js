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
import MyBox from "../../../components/MyBox";
//icons
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

//assets
import noteImg from "../../../assets/images/note.png";

const Notes = (props) => {
  let navigate = useNavigate();
  //Note Context
  const NoteContext = useContext(noteContext);
  const {
    notes,
    getNotes,
    editNote,
    isFetching,
    addNoteForm,
    handleCloseAddNoteForm,
  } = NoteContext;

  //user context
  const user_context = useContext(userContext);
  const { user, getUser, deleteOrphanedNotes } = user_context;

  //app context
  const { showAlert, theme } = useContext(appContext);

  // Initiallisation of note
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // user credentials
  const [id, setId] = useState(null);
  useEffect(() => {
    if (user && user._id) {
      setId(user._id);
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate(`/`);
    }
    // eslint-disable-next-line
  }, []);

  //for modal
  const [open, setOpen] = useState(false);

  // if user got delted from database

  const checkUserStatus = async (e) => {
    try {
      const response = await fetch(
        "https://note-sphere.vercel.app/auth/checkuserstatus",
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
      // console.log("Error checking user status:", error);
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
    showAlert(0, "Updated Succesfully");
  };

  const handleChange = (e) => {
    // console.log(e.target.name);
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
        <Box position="relative">
          <Modal
            open={open}
            onClose={handleClose}
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
                color={theme.palette.primary.main}
                sx={{
                  backgroundColor: theme.palette.secondary.dark,
                  backgroundSize: "cover", // to cover the given area
                  backgroundPosition: "center", // to show image completely
                }}
              >
                <CreateRoundedIcon />
              </MyBox>
              <RootContainer
                sx={{
                  mt: -4,
                  minWidth: "40vw",
                  width: "80%",
                  maxHeight: "80%",
                  overflow: "auto",
                  border: `2px solid ${theme.palette.font.dark}`,
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
                  defaultValue={note.etitle}
                  onChange={handleChange}
                />

                <StyledTextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="edescription"
                  id="edescription"
                  value={note.edescription}
                  defaultValue={note.edescription}
                  onChange={handleChange}
                />

                <StyledTextField
                  label="Tag"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  defaultValue={note.etag}
                  onChange={handleChange}
                />

                <SubmitButton
                  type="submit"
                  variant="contained"
                  onClick={handleClick}
                >
                  Submit
                </SubmitButton>
              </RootContainer>
            </div>
          </Modal>

          <AddNote
            addNoteForm={addNoteForm}
            handleCloseAddNoteForm={handleCloseAddNoteForm}
          />
          <Box mt={5} mb={3}>
            <Grid container spacing={1} m="auto">
              {notes.map((note) => {
                return (
                  <Grid item xs={12} md={6} xl={4} p={2} key={note._id}>
                    <NoteItem note={note} updateNote={updateNote} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Notes;
