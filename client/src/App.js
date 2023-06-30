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
import appContext from "./context/app/appContext";

// State
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import MyAlert from "./components/Alert";
import { Box } from "@mui/system";

const App = () => {
  // app Context
  const { showNav, alert, progress, theme } = useContext(appContext);

  return (
    <Router>
      <UserState>
        {showNav && <NavBar />}
        <LoadingBar
          height={5}
          color={theme.palette.secondary.dark}
          progress={progress}
        />
        <Box
          position="absolute"
          zIndex={99999999}
          style={{
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <MyAlert alert={alert} />
        </Box>

        <div className="container">
          <Routes>
            <Route exact path="/:id/noteboard" element={<NoteBoard />} />
            <Route exact path="/" element={<About />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/auth/:id/verify/:token"
              element={<EmailVerify />}
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
            <Route exact path="/:id/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </UserState>
    </Router>
  );
};

export default App;
