import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "647aac398a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647aac398a3648f957bad594",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-1",
          "description": "Fake-1",
          "tag": "tag-1",
          "date": "2023-06-03T02:58:01.250Z",
          "__v": 0
        },
        {
          "_id": "647b1efc3335f6b081d4c8c6",
          "user": "647a75c05a5ca5e0a815d576",
          "title": "Fake-2",
          "description": "Fake-2",
          "tag": "tag-2",
          "date": "2023-06-03T11:07:40.239Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);

    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;