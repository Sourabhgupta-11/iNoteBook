import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import alertContext from "../context/alert/alertContext";
import './AuthForm.css';

const Login = () => {
  const REACT_URL = process.env.REACT_APP_BASE_URL;
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch(`${REACT_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem('token', json.token);
        showAlert("Logged in successfully!", "success");
        navigate("/");
      } else {
        showAlert("Invalid credentials", "danger");
      }
    } catch {
      showAlert("Network error. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">📓</div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to your iNotebook account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="in-label" htmlFor="email">Email address</label>
            <input
              type="email" name="email" id="email"
              className="in-field"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={onChange} required
            />
          </div>

          <div className="auth-field">
            <label className="in-label" htmlFor="password">Password</label>
            <div className="pwd-wrap">
              <input
                type={showPwd ? "text" : "password"}
                name="password" id="password"
                className="in-field"
                placeholder="Your password"
                value={credentials.password}
                onChange={onChange} required
              />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd(v => !v)}>
                <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary-c auth-submit" disabled={loading}>
            {loading
              ? <><span className="auth-spinner"></span> Logging in…</>
              : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signUp">Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
