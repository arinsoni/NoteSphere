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
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePassword from "./pages/createPassword";
import MainPage from "./pages/mainPage";
import Home from "./pages/Home"

//context
import app_context from "./context/app/appContext";

// State
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";
import AppState from "./context/app/appState";
import { useContext, useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  //progress
  const [progress, setProgress] = useState(0);
   //alert
   const [alert, setAlert] = useState(null);


  //alert
  const showAlert = (message, type) => {
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
      <Router>
        <AppState>
          <UserState setProgress={setProgress}>
            <NoteState setProgress={setProgress}>
              <NavBar  />
              <LoadingBar height={5} color="#f11946" progress={progress} />
              <Alert alert={alert} />
              <div className="container">
                <Routes>
                  <Route
                    exact
                    path="/:id/noteboard"
                    element={
                      <Home showAlert={showAlert} />
                    }
                  />
                  <Route exact path="/" element={<About />} />
                  <Route
                    exact
                    path="/login"
                    element={
                      <LogIn setProgress={setProgress} showAlert={showAlert} />
                    }
                  />
                  <Route
                    exact
                    path="/signup"
                    element={
                      <SignUp setProgress={setProgress} showAlert={showAlert} />
                    }
                  />
                  <Route
                    exact
                    path="/auth/:id/verify/:token"
                    element={<EmailVerify setProgress={setProgress} />}
                  />
                  <Route
                    exact
                    path="/auth/reset-password/:resetToken"
                    element={
                      <ResetPassword
                        showAlert={showAlert}
                        setProgress={setProgress}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/auth/forgot-password"
                    element={
                      <ForgotPassword/>
                    }
                  />
                  <Route
                    exact
                    path="/auth/create-password/:createPasswordToken"
                    element={
                      <CreatePassword/>
                    }
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <Dashboard/>
                    }
                  />
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
