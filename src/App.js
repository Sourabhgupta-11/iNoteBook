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

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
