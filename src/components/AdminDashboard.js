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
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky">
            <div className="profile text-center py-4">
              <img src="profile-picture-url" alt="Profile" className="img-fluid rounded-circle" />
              <h3>ADMIN</h3>
              <p>Online</p>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link btn btn-link">USER DATA</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link">USER INFORMATION</button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <header className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
            <div className="logo d-flex align-items-center">
              <img src="logo-url" alt="Logo" className="img-fluid" />
              <h1 className="h2 ml-3">SmartPosture</h1>
            </div>
            <div className="user-actions">
              <button className="btn btn-outline-secondary" onClick={handleLogout}>LOGOUT</button>
            </div>
          </header>

          <div className="welcome-section py-4">
            <h1>Dashboard</h1>
          </div>

          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">2500</h2>
                  <p className="card-text">Welcome</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">123.50</h2>
                  <p className="card-text">Average Time</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">1,805</h2>
                  <p className="card-text">Collections</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">54</h2>
                  <p className="card-text">Comments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card text-center bg-primary text-white">
                <div className="card-body">
                  <h3 className="card-title">35k Friends</h3>
                  <p className="card-text">128 Feeds</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center bg-info text-white">
                <div className="card-body">
                  <h3 className="card-title">584k Followers</h3>
                  <p className="card-text">978 Tweets</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center bg-success text-white">
                <div className="card-body">
                  <h3 className="card-title">758+ Contacts</h3>
                  <p className="card-text">365 Feeds</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card text-center bg-danger text-white">
                <div className="card-body">
                  <h3 className="card-title">450 Followers</h3>
                  <p className="card-text">57 Circles</p>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-section py-4">
            <h2>Extra Area Chart</h2>
            <img src="chart-image-url" alt="Chart" className="img-fluid" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
