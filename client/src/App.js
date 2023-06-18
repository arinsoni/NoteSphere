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
import ResetPassword from './pages/ResetPassword';
import LoadingBar from 'react-top-loading-bar'
import ForgotPassword from './pages/ForgotPassword';
import CreatePassword from './pages/createPassword';


function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0)
;
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
   <UserState setProgress={setProgress} >
      <NoteState setProgress = {setProgress} >
        <Router>
          <NavBar showAlert={showAlert} />
          <LoadingBar
            height={5}
            color='#f11946'
            progress={progress}
          />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/:id/noteboard" element={<Home showAlert={showAlert} setProgress={setProgress}  />} />
              <Route exact path="/" element={<About />} />
              <Route exact path="/login" element={<LogIn setProgress={setProgress}  showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp setProgress={setProgress} showAlert={showAlert} />} />
              <Route exact path="/auth/:id/verify/:token" element={<EmailVerify setProgress={setProgress} />} />
              <Route exact path="/auth/reset-password/:resetToken" element={<ResetPassword setProgress={setProgress} />} />
              <Route exact path="/auth/forgot-password" element={<ForgotPassword showAlert={showAlert}  setProgress={setProgress} />} />
              <Route exact path="/auth/create-password/:createPasswordToken" element={<CreatePassword showAlert={showAlert}  setProgress={setProgress} />} />

       
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}



export default App;