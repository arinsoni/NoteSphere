
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
