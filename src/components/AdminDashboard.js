import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
    navigate('/login');
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
                <th>Client Name</th>
                <th>USER ID</th>
                <th>CORRECT POSTURE</th>
                <th>Invested</th>
                <th>Valuation</th>
                <th>Policy Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ralph Edwards</td>
                <td>541829367FI</td>
                <td>USD</td>
                <td>184,540.00</td>
                <td>250,518.70</td>
                <td>Regular Savings, Insurance</td>
                <td><button>View</button></td>
              </tr>
              {/* Add other rows similarly */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
