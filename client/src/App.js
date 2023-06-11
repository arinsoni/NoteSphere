import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from '../src/pages/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import EmailVerify from './pages/EmailVerify';
import { useState } from 'react';
import UserState from './context/user/UserState';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
   <UserState>
      <NoteState>
        <Router>
          <NavBar showAlert={showAlert} />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/:id/noteboard" element={<Home showAlert={showAlert} />} />
              <Route exact path="/" element={<About />} />
              <Route exact path="/login" element={<LogIn showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
              <Route exact path="/auth/:id/verify/:token" element={<EmailVerify/>} />
       
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}



export default App;