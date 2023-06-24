import React, { useContext } from "react";

// MUI components
import { CardContent, Typography, IconButton } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { styled } from "@mui/system";

//Note Components
import { StyledCard } from "./NotesComponents";

//context
import noteContext from "../../../context/notes/noteContext";
import appContext from "../../../context/app/appContext";

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#202940",
}));

const NoteItem = ({ showAlert, note, updateNote }) => {
  //note context
  const NoteCotext = useContext(noteContext);
  const { deleteNote } = NoteCotext;

  //app context
  const AppContext = useContext(appContext);
  const { themeMode } = AppContext;

  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("Deleted Successfully", "success");
  };

  const handleEdit = () => {
    updateNote(note);
  };

  return (
    <StyledCard themeMode={themeMode}>
      <CardContent>
        <Title variant="h6" component="div">
          {note.title}
        </Title>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {note.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {note.tag}
        </Typography>
      </CardContent>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}
      >
        <IconButton onClick={handleDelete}>
          <DeleteOutline />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </div>
    </StyledCard>
  );
};

export default NoteItem;
