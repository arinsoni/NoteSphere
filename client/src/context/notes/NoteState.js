import React, { useContext, useState } from "react";
import NoteContext from "./noteContext";
import appContext from "../app/appContext";

const NoteState = (props) => {
  const { showAlert, setProgress } = useContext(appContext);
  const host = "https://note-sphere.vercel.app";
  const notesInitial = [];

  // Update Note opening and closing
  const [open, setOpen] = useState(false);

  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //add a note
  const addNote = async (title, description, tag) => {
    setProgress(20);
    const response = await fetch(`${host}/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    setProgress(40);
    const note = await response.json();
    setProgress(60);
    setNotes([note, ...notes]);
    setProgress(80);
    setProgress(100);
    showAlert(0, "Note added successfully");
  };

  // deleting Note
  const deleteNote = async (id) => {
    setProgress(20);
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setProgress(40);
    const json = await response.json();
    setProgress(60);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    setProgress(100);
    showAlert(0, "Note deleted successfully");
  };

  const editNote = async (id, title, description, tag) => {
    setProgress(30);
    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    setProgress(60);
    const json = await response.json();
    setProgress(80);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const ele = newNotes[index];
      if (ele._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    setProgress(100);
  };

  // Add note form handilng
  const [addNoteForm, setAddNoteForm] = useState(false);
  const handleOpenAddNoteForm = () => {
    setAddNoteForm(true);
  };
  const handleCloseAddNoteForm = () => {
    setAddNoteForm(false);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        addNoteForm,
        setAddNoteForm,
        handleCloseAddNoteForm,
        handleOpenAddNoteForm,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
