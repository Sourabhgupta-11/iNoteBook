import React from 'react'
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
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
          </Routes>
        </Router>
        </NoteState>
    </AlertState>
  );
}

export default App;
