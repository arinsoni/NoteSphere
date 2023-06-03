import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from '../src/pages/About';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
       
       <BrowserRouter>
       <NavBar/>
        <Routes>
          <Route exact path='/home' element={ <Home/> } />
          <Route exact path='/about' element={ <About/> } />
        </Routes>
       </BrowserRouter>
    </>
  

  );
}

export default App;
