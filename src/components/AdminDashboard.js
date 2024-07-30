import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserInfoAndStats} from '../api/api';
import UserDetailsModal from './userDetailsModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfoAndStats();
      setUserStats(data);
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };
  
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className="menu-item">Dashboard</div>
          <div className="menu-item">Advisors</div>
          <div className="menu-item">Clients</div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <span className="user-name">ADMIN</span>
          </div>
        </header>
        <div className="clients-section">
          <div className="clients-header">
            <h1>Clients</h1>
          </div>
          
          <table className="clients-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>USER ID</th>
                <th>Birthdate</th>
                <th>Total Pushups</th>
                <th>Total Squats</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
            {userStats.map(user => (
              <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.userId}</td>
                <td>{user.birthdate}</td>
                <td>{user.totalPushUps}</td>
                <td>{user.totalSquats}</td>
                <td>
                  <button onClick={() => handleUserClick(user)}>View Details</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <UserDetailsModal user={selectedUser} onClose={handleCloseModal} />
      </main>
    </div>
  );
};

export default AdminDashboard;
