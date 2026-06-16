import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const REACT_URL = process.env.REACT_APP_BASE_URL;
  const location  = useLocation();
  const navigate  = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [user,        setUser]        = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const sidebarRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') { setShowSidebar(false); setMenuOpen(false); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowSidebar(false);
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (!showSidebar) fetchUserProfile();
    setShowSidebar(v => !v);
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res  = await fetch(`${REACT_URL}/api/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.user);
    } catch { setUser(null); }
    finally  { setLoading(false); }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="nb-nav">
        <div className="nb-nav-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <span className="nb-logo-icon">📓</span>
            <span>iNotebook</span>
          </Link>

          {/* Desktop links */}
          <div className="nb-links">
            {isLoggedIn && (
              <Link to="/" className={`nb-link${isActive('/') ? ' nb-link-active' : ''}`}>
                Home
              </Link>
            )}
          </div>

          {/* Right actions */}
          <div className="nb-actions">
            {!isLoggedIn ? (
              <>
                <Link to="/login"  className="btn-ghost-c nb-auth-btn">Log in</Link>
                <Link to="/signUp" className="btn-primary-c nb-auth-btn">Sign up</Link>
              </>
            ) : (
              <>
                <button className="btn-ghost-c nb-logout-btn" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket" style={{fontSize:'13px'}}></i>
                  <span>Log out</span>
                </button>
                <button className="nb-avatar-btn" onClick={toggleSidebar} aria-label="Profile">
                  <FaUserCircle />
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="nb-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span className={`nb-ham-line${menuOpen ? ' nb-ham-open' : ''}`}></span>
            <span className={`nb-ham-line${menuOpen ? ' nb-ham-open' : ''}`}></span>
            <span className={`nb-ham-line${menuOpen ? ' nb-ham-open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nb-mobile-menu">
            {isLoggedIn && (
              <Link to="/" className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link to="/login"  className="nb-mobile-link" onClick={() => setMenuOpen(false)}>Log in</Link>
                <Link to="/signUp" className="nb-mobile-link nb-mobile-cta" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            ) : (
              <>
                <button className="nb-mobile-link nb-mobile-profile" onClick={() => { setMenuOpen(false); toggleSidebar(); }}>Profile</button>
                <button className="nb-mobile-link nb-mobile-logout"  onClick={() => { setMenuOpen(false); handleLogout(); }}>Log out</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Profile sidebar overlay */}
      {showSidebar && (
        <div className="nb-overlay" onClick={() => setShowSidebar(false)}>
          <div className="nb-sidebar" ref={sidebarRef} onClick={e => e.stopPropagation()}>
            <div className="nb-sidebar-header">
              <h4>Profile</h4>
              <button className="nb-sidebar-close" onClick={() => setShowSidebar(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {loading && (
              <div className="nb-sidebar-loading">
                <div className="nb-spinner"></div>
              </div>
            )}

            {!loading && user && (
              <div className="nb-sidebar-body">
                <div className="nb-avatar-large">
                  {user.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="nb-user-name">{user.name}</div>
                <div className="nb-user-email">{user.email}</div>
                <div className="nb-user-meta">
                  <span className="nb-meta-label">Member since</span>
                  <span className="nb-meta-value">{new Date(user.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            )}

            {!loading && !user && (
              <p className="nb-sidebar-empty">Could not load profile.</p>
            )}

            <div className="nb-sidebar-footer">
              <button className="btn-primary-c" style={{width:'100%', justifyContent:'center'}} onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
