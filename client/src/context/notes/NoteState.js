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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3Y2Q1MzQ2M2IyZmEyYjQ3ZDBlNjZjIn0sImlhdCI6MTY4NTkwMjY2OH0.00QN-XJyqOAfWohcLBdRObhKeK_yw_v_5Zhc8GWzhro'
      }
    });


    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  const addNote = (title, description, tag) => {
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
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);

  }
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YTc1YzA1YTVjYTVlMGE4MTVkNTc2In0sImlhdCI6MTY4NTc0ODMwNH0.a2rQEpJT8CMiDXo3bwB9Ubij-HcTJDvWORGllnMhE-M'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const ele = notes[index];
      if (ele._id === id) {
        ele.title = title;
        ele.description = description;
        ele.tag = tag;
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;