import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/getAllNotes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        },
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
}


  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes([note, ...notes]);

  }
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);

  }
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
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
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;