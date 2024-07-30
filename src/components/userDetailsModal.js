// src/UserDetailsModal.js
import React from 'react';
import './userDetailsModal.css';
function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User Details</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Birthdate:</strong> {user.birthdate}</p>
        <p><strong>Total Push-Ups:</strong> {user.totalPushUps}</p>
        <p><strong>Total Squats:</strong> {user.totalSquats}</p>
      </div>
    </div>
  );
}

export default UserDetailsModal;
