import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import './userDetailsModal.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

function UserDetailsModal({ user, onClose }) {
  if (!user || !user.stats) return null;

  const dates = Object.keys(user.stats).sort();
  const pushUps = dates.map(date => user.stats[date].pushup || 0);
  const squats = dates.map(date => user.stats[date].squat || 0);

  const pushUpData = {
    labels: dates,
    datasets: [
      {
        label: 'Push-Ups',
        data: pushUps,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const squatData = {
    labels: dates,
    datasets: [
      {
        label: 'Squats',
        data: squats,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

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
        <div style={{ marginBottom: '20px' }}>
          <h3>Push-Ups Over Time</h3>
          <Line data={pushUpData} options={options} />
        </div>

        <div>
          <h3>Squats Over Time</h3>
          <Line data={squatData} options={options} />
        </div>
        </div>
      </div>
    
  );
}

export default UserDetailsModal;
