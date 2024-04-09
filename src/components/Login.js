import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>SmartPosture</h1>
      <i><h2>Posture Corrector</h2></i>

      <div>
        <input 
          className="login-input"
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <input 
          className="login-input"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button className="login-btn" onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
