import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
import './AuthForm.css';

const SignUp = () => {
  const REACT_URL = process.env.REACT_APP_BASE_URL;
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [loading,  setLoading]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [pwdErr,   setPwdErr]   = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      setPwdErr("Passwords do not match.");
      return;
    }
    setPwdErr("");
    setLoading(true);
    try {
      const res  = await fetch(`${REACT_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem('token', json.token);
        showAlert("Account created successfully!", "success");
        navigate("/");
      } else {
        showAlert(json.error || "Something went wrong", "danger");
      }
    } catch {
      showAlert("Network error. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'cpassword' || e.target.name === 'password') setPwdErr("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">📓</div>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Start organising your notes for free</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="in-label" htmlFor="name">Full name</label>
            <input
              type="text" name="name" id="name"
              className="in-field" placeholder="Your name"
              onChange={onChange} required
            />
          </div>

          <div className="auth-field">
            <label className="in-label" htmlFor="email">Email address</label>
            <input
              type="email" name="email" id="email"
              className="in-field" placeholder="you@example.com"
              onChange={onChange} required
            />
          </div>

          <div className="auth-field">
            <label className="in-label" htmlFor="password">Password <span className="auth-hint">(min. 5 chars)</span></label>
            <div className="pwd-wrap">
              <input
                type={showPwd ? "text" : "password"}
                name="password" id="password"
                className="in-field" placeholder="Create a password"
                onChange={onChange} minLength={5} required
              />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd(v => !v)}>
                <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="in-label" htmlFor="cpassword">Confirm password</label>
            <div className="pwd-wrap">
              <input
                type={showCPwd ? "text" : "password"}
                name="cpassword" id="cpassword"
                className={`in-field${pwdErr ? ' in-field-err' : ''}`}
                placeholder="Repeat your password"
                onChange={onChange} minLength={5} required
              />
              <button type="button" className="pwd-toggle" onClick={() => setShowCPwd(v => !v)}>
                <i className={`fa-solid ${showCPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {pwdErr && <span className="auth-err">{pwdErr}</span>}
          </div>

          <button type="submit" className="btn-primary-c auth-submit" disabled={loading}>
            {loading
              ? <><span className="auth-spinner"></span> Creating account…</>
              : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
