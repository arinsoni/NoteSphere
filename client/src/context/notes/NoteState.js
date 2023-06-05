import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    // API Call 

    const response = await fetch('http://localhost:5000/notes/getAllNotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZDJlOGQ4MDg3NzY0NTg4YzcwYTY2In0sImlhdCI6MTY4NTkyNTUyMn0.KbZ91irz8jF14pfYjqExJ_SBjvLIzxQ-R2iBMILE9h8'
      }
    });


    const json = await response.json()
  
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZDJlOGQ4MDg3NzY0NTg4YzcwYTY2In0sImlhdCI6MTY4NTkyNTUyMn0.KbZ91irz8jF14pfYjqExJ_SBjvLIzxQ-R2iBMILE9h8'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = {
      "_id": `647b1efdchjv333dg5f6b081d4c8c6${title}`,
      "user": "647a75c05a5ca5e0a815d576",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-03T11:07:40.239Z",
      "__v": 0
    }
    setNotes([note, ...notes]);

  }
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZDJlOGQ4MDg3NzY0NTg4YzcwYTY2In0sImlhdCI6MTY4NTkyNTUyMn0.KbZ91irz8jF14pfYjqExJ_SBjvLIzxQ-R2iBMILE9h8'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZDJlOGQ4MDg3NzY0NTg4YzcwYTY2In0sImlhdCI6MTY4NTkyNTUyMn0.KbZ91irz8jF14pfYjqExJ_SBjvLIzxQ-R2iBMILE9h8'
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