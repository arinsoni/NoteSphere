
import UserContext from './userContext';
import { useState, useEffect } from 'react';


const host = "http://localhost:5000";
const userInitial = null;


const UserState = (props) => {
  const [user, setUser] = useState(userInitial);


  const getUser = async () => {
    try {
      const response = await fetch(`${host}/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const json = await response.json();
      setUser(json);
     
    } catch  {
      console.log('Error fetching user data:');
      
    }
  };


  const deleteOrphanedNotes = async () => {
    // Make an API request to your backend server to delete orphaned notes
    try {
      const response = await fetch('http://localhost:5000/notes/deleteorphanednotes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log('Orphaned notes deleted successfully');
      } else {
        console.log('Error deleting orphaned notes:', data.message);
      }
    } catch (error) {
      console.log('Error deleting orphaned notes:', error);
    }
  };


  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser(); // Fetch user data on component mount
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      deleteOrphanedNotes();
    }, 1000*60); // Check every 1 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  });

  return (
    <UserContext.Provider value={{ user, getUser, deleteOrphanedNotes}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
