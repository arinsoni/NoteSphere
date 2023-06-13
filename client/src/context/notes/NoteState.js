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
    setNotes(json)
}


  const addNote = async (title, description, tag) => {
    props.setProgress(20)
    const response = await fetch(`${host}/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    props.setProgress(40)
    const note = await response.json();
    props.setProgress(60)
    setNotes([note, ...notes]);
    props.setProgress(80)
    props.setProgress(100)
  }
  const deleteNote = async (id) => {
    props.setProgress(20)
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    props.setProgress(40)
    const json = response.json();
    props.setProgress(60)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
    props.setProgress(100)

  }
  const editNote = async (id, title, description, tag) => {
    props.setProgress(30)
    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    props.setProgress(60)
    const json = await response.json();
    props.setProgress(80)
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
    props.setProgress(100)
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;