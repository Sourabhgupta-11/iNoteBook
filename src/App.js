import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Alert from "./components/Alert";
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <AlertState>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert/>
          <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signUp" element={<SignUp/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
          </Routes>
        </Router>
        </NoteState>
    </AlertState>
  );
}

export default App;
