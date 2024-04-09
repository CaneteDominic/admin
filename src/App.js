
import React, { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <AdminDashboard />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;