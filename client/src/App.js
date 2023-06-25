import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

//App CSS
import "./App.css";

//My Components
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";

//Pages
import About from "../src/pages/About";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePassword from "./pages/createPassword";
import NoteBoard from "./pages/Notes/NoteBoard";

//context
import appContext from "./context/app/appContext"

// State
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";
import AppState from "./context/app/AppState";
import { useContext, useState } from "react";
import Dashboard from "./pages/Dashboard";
import MyAlert from "./components/Alert";

const App = ()=> {
  //progress
  const [progress, setProgress] = useState(0);

  // app Context
  const AppContext = useContext(appContext);



  return (
    <AppState>
      <Router>
        
          <UserState setProgress={setProgress}>
            <NoteState setProgress={setProgress}>
              <NavBar />
              <LoadingBar height={5} color="#f11946" progress={progress} />
 
      
              <div className="container">
                <Routes>
                  <Route
                    exact
                    path="/:id/noteboard"
                    element={<NoteBoard />}
                  />
                  <Route exact path="/" element={<About />} />
                  <Route
                    exact
                    path="/login"
                    element={
                      <LogIn setProgress={setProgress}  />
                    }
                  />
                  <Route
                    exact
                    path="/signup"
                    element={
                      <SignUp setProgress={setProgress} />
                    }
                  />
                  <Route
                    exact
                    path="/auth/:id/verify/:token"
                    element={<EmailVerify setProgress={setProgress} />}
                  />
                  <Route
                    exact
                    path="/auth/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route
                    exact
                    path="/auth/create-password/:createPasswordToken"
                    element={<CreatePassword />}
                  />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
            </NoteState>
          </UserState>
       
      </Router>
      </AppState>
   
  );
}

export default App;
