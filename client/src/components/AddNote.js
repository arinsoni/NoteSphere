import React, { useEffect, useState } from 'react';
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import userContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
    let navigate = useNavigate();
    let flag = 0;
    const [userIdFetched, setUserIdFetched] = useState(false);
    const user_context = useContext(userContext);
    const { user, getUser } = user_context;
    useEffect(() => {
        if (user && user._id) {
            console.log("mil gai")
            setUserIdFetched(true); // Update the flag when user ID is fetched
        }
    }, [user]);
    useEffect(() => {
        const getUser = () => {
          // Implementation of getUser function
        };
    
        const intervalId = setInterval(() => {
          if (localStorage.getItem('token')) {
            getUser();
            setUserIdFetched(true);
            // console.log(notes)
          } else {
            navigate('/signup');
          }
        }, 1000); // Interval time in milliseconds
    
        return () => {
          clearInterval(intervalId); // Cleanup the interval on component unmount
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default " })
    const handleClick = async (e) => {
        e.preventDefault();
        if (userIdFetched) {
            console.log("aane de")
            if (user && user._id) {
                console.log("oh")
                addNote(note.title, note.description, note.tag);
            }
            else{
                navigate('/about')
            }
        }
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Succesfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="conatiner my-3">
                <h1>Add A Note</h1>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="title" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
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
