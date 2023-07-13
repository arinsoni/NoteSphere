import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import { Box } from "@mui/system";

//App CSS
import "./App.css";

//My Components
import NavBar from "./components/NavBar";
import MyAlert from "./components/Alert";

//Pages
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NoteBoard from "./pages/Notes/NoteBoard";
import Dashboard from "./pages/Dashboard";

//context
import appContext from "./context/app/appContext";
import userContext from "./context/user/userContext";


const App = () => {
  // app Context
  const { showNav, alert, progress, theme } = useContext(appContext);

  //user Context
  const { isLogin } = useContext(userContext);

  return (
    <Router>
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
        {" "}
         <MyAlert alert={alert} />
      </Box>

      <div className="container">
        <Routes>
          <Route exact path="/:id/noteboard" element={<NoteBoard />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/auth/forgot-password"
            element={<ForgotPassword />}
          />
          <Route exact path="/:id/dashboard/:tab" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
