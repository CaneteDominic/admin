import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        onLogin();
        navigate('/admin/summary');
      })
      .catch((error) => {
        setError('Invalid Credentials');
      });
  };

  return (
    <div className="login-container">
      <div className='content'>
        <h1 className="title">Smart<span>Posture</span></h1>
        <p className="subtitle">Posture Corrector Application</p>
        <div className="input-container">
          <input 
            className="login-input"
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input 
            className="login-input"
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>LOG IN</button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
