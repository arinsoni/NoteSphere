import React, { useState } from 'react';
import {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default " })
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="conatiner my-3">
                <h1>Add A Note</h1>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="title" className="form-control" id="title" name="title" aria-describedby="emailHelp"onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
            </form>
            <div className="conatiner my-3">
                <h1>Your Notes</h1>
            </div>
        </div>
    )
}

export default AddNote
