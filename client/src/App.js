import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from '../src/pages/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// Context
import NoteState from './context/notes/NoteState';
import UserState from './context/user/UserState';
import AppState from './context/app/appState';

import Alert from './components/Alert';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import EmailVerify from './pages/EmailVerify';
import { useState } from 'react';

import ResetPassword from './pages/ResetPassword';
import LoadingBar from 'react-top-loading-bar'
import ForgotPassword from './pages/ForgotPassword';
import CreatePassword from './pages/createPassword';
import Profile from './pages/Profile/Profile';


function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0)
    ;
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  // hiding navbar on profile page
  const [showNav, setShowNav] = useState(true)

  return (
     <>
     <Router>
      <AppState>
        <UserState setProgress={setProgress}>
          <NoteState setProgress={setProgress}>
            
               { showNav && <NavBar showAlert={showAlert} />}
              <LoadingBar height={5} color='#f11946' progress={progress} />
              <Alert alert={alert} />
              <div className="container">
                <Routes>
                  <Route exact path="/:id/noteboard" element={<Home showAlert={showAlert} setProgress={setProgress} />} />
                  <Route exact path="/" element={<About />} />
                  <Route exact path="/login" element={<LogIn setProgress={setProgress} showAlert={showAlert} />} />
                  <Route exact path="/signup" element={<SignUp setProgress={setProgress} showAlert={showAlert} />} />
                  <Route exact path="/auth/:id/verify/:token" element={<EmailVerify setProgress={setProgress} />} />
                  <Route exact path="/auth/reset-password/:resetToken" element={<ResetPassword showAlert={showAlert} setProgress={setProgress} />} />
                  <Route exact path="/auth/forgot-password" element={<ForgotPassword showAlert={showAlert} setProgress={setProgress} />} />
                  <Route exact path="/auth/create-password/:createPasswordToken" element={<CreatePassword showAlert={showAlert} setProgress={setProgress} />} />
                  <Route exact path="/profile" element={<Profile showAlert={showAlert} setProgress={setProgress} setShowNav={setShowNav} />} />
                </Routes>
              </div>
           
          </NoteState>
        </UserState>
      </AppState>
      </Router>
    </>
  );
}



export default App;