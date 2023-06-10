import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import userContext from "../context/user/userContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const user_context = useContext(userContext);
  const { notes, getNotes, editNote } = context;
  const { user, getUser } = user_context;
  let navigate = useNavigate();
  const checkUserStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/checkuserutatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include the user's token in the request headers
        }
      });
      const data = await response.json();
      if (!data.success) {
        navigate('/signup'); // Redirect to the about page if user status is not successful
      }
    } catch (error) {
      console.log('Error checking user status:', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkUserStatus();
    }, 1000); // Check every 1 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      // console.log(notes)
    } else {
      navigate('/about')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })


  }
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Succesfully", "success")

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <button style={{ display: 'none' }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* / */}
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">  </label>
                  <input type="etitle" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>


              </form>
              {/*  */}
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNote showAlert={props.showAlert} />
      <div className='row d-flex'>
        {notes.length === 0 && "No notes available"}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
        })}
        {user && user.firstName && <p>Name: {user.verified}</p>}
      </div>
    </>

  )
}

export default Notes


