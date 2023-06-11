import React, { useContext, useEffect } from 'react'
import user_context from "../context/user/userContext"

const About = () => {
  const userContext = useContext(user_context);
  const { user } = userContext;


  return (
    <div>
     This is about section

     {user && user.firstName ? <p>Name: {user.firstName}</p> : <p>  <a href="/signup"> Sign Up</a> or <a href="/login">Log In</a></p> }


    </div>
  )
}

export default About
