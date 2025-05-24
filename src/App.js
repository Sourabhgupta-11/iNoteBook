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
    
      <Router>
        <NoteState>
        <Navbar/>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        </NoteState>
      </Router>
    
  );
}

export default App;
