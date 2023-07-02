import React, { useContext, useEffect } from "react";
import user_context from "../context/user/userContext";
import MainPage from "./mainPage";
//alert
import MyAlert from "../components/Alert";

import appContext from "../context/app/appContext";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const About = (props) => {
  const userContext = useContext(user_context);
  const { user } = userContext;

  const AppContext = useContext(appContext);
  const { showAlert } = AppContext;
  const handleClick = () => {
    showAlert(1, "hello")
  };

  return (
    <>
    <MainPage>

      <div>
        This is about section
        {user && user.name ? (
          <p>Name: {user.name}</p>
        ) : (
          <p>
            {" "}
            <a href="/signup"> Sign Up</a> or <a href="/login">Log In</a>
          </p>
        )}
      </div>

      <button onClick={handleClick}>Click me</button>
    </MainPage>
   
    <Container maxWidth="md" sx={{ bgcolor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h4" component="h2" sx={{ color: '#333', marginBottom: '10px' }}>
        About
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#666', marginBottom: '10px' }}>
        Personal Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel fermentum eros, eget
        ullamcorper nisi. Donec efficitur elit vel justo vulputate, non tristique nisi semper. Integer non nunc
        eget odio gravida lobortis. Fusce rhoncus facilisis elementum.
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#666', marginBottom: '10px' }}>
        MyWebsite is a platform dedicated to saving your notes and providing a convenient sign-up and login process.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque neque in commodo porta. Ut varius
        quam sed turpis imperdiet, sed tincidunt leo iaculis. Vestibulum a dolor non mi sagittis vestibulum.
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#666', marginBottom: '10px' }}>
        Features:
        <ul>
          <li>Save and organize your notes in one place</li>
          <li>Securely store your sensitive information</li>
          <li>Access your notes from anywhere, anytime</li>
          <li>Intuitive user interface for easy navigation</li>
          <li>Collaborate and share notes with others</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#666', marginBottom: '10px' }}>
        Our mission is to simplify the note-taking process and provide a reliable platform for individuals to store and
        access their important information. With MyWebsite, you can focus on capturing your thoughts without worrying
        about losing or misplacing your notes.
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: '#666', marginBottom: '10px' }}>
        We are constantly working to improve our platform and add new features to enhance your note-taking experience.
        If you have any suggestions or feedback, please feel free to reach out to us. We'd love to hear from you!
      </Typography>
    </Container>
        </>
      );
    }
    
 
export default About;
