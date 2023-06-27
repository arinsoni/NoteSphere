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

const NoteItem = ({ note, updateNote }) => {
  //note context
  const NoteCotext = useContext(noteContext);
  const { deleteNote } = NoteCotext;

  //app context
  const AppContext = useContext(appContext);
  const { themeMode, theme } = AppContext;

  const handleDelete = () => {
    deleteNote(note._id);
    // showAlert("Deleted Successfully", "success");
  };

  const handleEdit = () => {
    updateNote(note);
  };

  return (
    <StyledCard>
      <CardContent>
        <Title variant="h6" component="div" style={{color: theme.palette.font.main, textTransform: "capitalize"}}>
          {note.title}
        </Title>
        <Typography variant="body2" color="text.secondary" gutterBottom style={{color: theme.palette.font.main, textTransform: "capitalize"}}>
          {note.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{color: theme.palette.font.main, textTransform: "capitalize"}}>
          {note.tag}
        </Typography>
      </CardContent>
      <div item xs={12} md={6} xl={4} sx={{ ml: "auto" }}
        style={{ display: "flex", justifyContent: "flex-end", position: "absolute", bottom: "0", right: "0"}}
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
