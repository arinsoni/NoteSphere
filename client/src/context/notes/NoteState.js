import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "647aac398a3ddfg648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398aerg36d48f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-2",
          "description": "Fake-2",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac3dg9d8a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-3",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398adggdd3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-4",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aadc398adggd3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-5",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647b1efdc333dg5f6b081d4c8c6",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-6",
          "description": "Fake-2",
          "tag": "tag-2",
          "date": "2023-06-03T11:07:40.239Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
      
      const addNote = (title, description, tag) => {

        const note = {
          "_id": "647b1efdchjv333dg5f6b081d4c8c6",
          "user": "647a75c05a5ca5e0a815d576",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-06-03T11:07:40.239Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }
      const deleteNote = (_id) => {
        
        // setNotes(notes.pop(note))
      }
     

    
    return (
        <NoteContext.Provider value={{notes, addNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;