import { useState, useEffect } from 'react';
import UserContext from './userContext';

const UserState = (props) => {
  
  const host = "http://localhost:5000";
  const [user, setUser] = useState(null);
// get user
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
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
