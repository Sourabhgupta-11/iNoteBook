import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';
import './Home.css';

const Home = () => {
  const { notes } = useContext(noteContext);
  const navigate  = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  return (
    <div className="page-wrap">
      {/* Page header */}
      <div className="home-header">
        <div>
          <h2 className="home-title">My Notes</h2>
          <p className="home-subtitle">
            {notes.length === 0
              ? "No notes yet — create your first one below"
              : `${notes.length} note${notes.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        <div className="home-tag tag-pill">
          <i className="fa-solid fa-cloud" style={{fontSize:'11px'}}></i>
          Cloud synced
        </div>
      </div>

      <Notes />
    </div>
  );
};

export default Home;
