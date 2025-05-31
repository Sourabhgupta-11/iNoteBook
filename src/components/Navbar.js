import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(false);
  // User data state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(location);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (!showSidebar) {
      fetchUserProfile();
    }
    setShowSidebar(prev => !prev);
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <form className='d-flex'>
                <Link className="btn btn-outline-light me-2 px-4 fw-semibold border-0" to="/login" role="button" style={{ backgroundColor: '#0d6efd' }}>
                  Login
                </Link>
                <Link className="btn btn-outline-light px-4 fw-semibold border-0" to="/signUp" role="button" style={{ backgroundColor: '#198754' }}>
                  SignUp
                </Link>
              </form>
            ) : (
              <>
                <button onClick={handleLogout} className='btn btn-outline-light ms-2'>
                  LogOut
                </button>
                <button
                  className="btn btn-link text-light ms-3"
                  onClick={toggleSidebar}
                  style={{ fontSize: '1.8rem', position: 'relative' }}
                  aria-label="User Profile"
                >
                  <FaUserCircle />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <div
        className={`sidebar bg-white ${showSidebar ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: 0,
          right: showSidebar ? 0 : '-300px',
          width: '300px',
          height: '100%',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
          transition: 'right 0.3s ease',
          zIndex: 1050,
          overflowY: 'auto',
        }}
      >
        <div className="p-4" onClick={e => e.stopPropagation()}>
          <h4 className="mb-4">User Profile</h4>
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {!loading && user && (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.date).toLocaleDateString()}</p>
            </>
          )}
          {!loading && !user && (
            <p>No user info available.</p>
          )}
          <button className="btn btn-secondary mt-3" onClick={toggleSidebar}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
