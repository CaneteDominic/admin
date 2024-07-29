import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/admin-dashboard"
          element={loggedIn ? <AdminDashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="*"
          element={loggedIn ? <AdminDashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
