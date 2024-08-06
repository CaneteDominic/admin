import React, { useState } from 'react';
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
  const [view, setView] = useState('daily'); 

  if (!user || !user.stats) return null;

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${month}/${day}`;
  };

  const aggregateMonthlyData = (data) => {
    const monthlyData = {};
    Object.keys(data).forEach((date) => {
      const month = date.substring(0, 6); 
      if (!monthlyData[month]) {
        monthlyData[month] = { pushup: 0, squat: 0 };
      }
      monthlyData[month].pushup += data[date].pushup || 0;
      monthlyData[month].squat += data[date].squat || 0;
    });
    return monthlyData;
  };

  const formatMonthlyDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    return `${month}/01`;
  };

  const dates = Object.keys(user.stats).sort();
  const formattedDates = view === 'daily' ? dates.map(date => formatDate(date)) : Object.keys(aggregateMonthlyData(user.stats)).sort().map(date => formatMonthlyDate(date));

  const pushUps = view === 'daily' ? dates.map(date => user.stats[date].pushup || 0) : Object.values(aggregateMonthlyData(user.stats)).map(month => month.pushup || 0);
  const squats = view === 'daily' ? dates.map(date => user.stats[date].squat || 0) : Object.values(aggregateMonthlyData(user.stats)).map(month => month.squat || 0);

  const pushUpData = {
    labels: formattedDates,
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
    labels: formattedDates,
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
        <div className="user-details">
          <div className="detail-item">
            <div><strong>Username</strong></div> 
            <div>{user.username}</div>
          </div>
          <div className="detail-item">
            <div><strong>User ID</strong></div> 
            <div>{user.userId}</div>
          </div>
          <div className="detail-item">
            <div><strong>Total Push-Ups</strong></div> 
            <div>{user.totalPushUps}</div>
          </div>
          <div className="detail-item">
            <div><strong>Total Squats</strong></div> 
            <div>{user.totalSquats}</div>
          </div>
        </div>
        <div className="view-toggle">
          <label style={{marginRight: '20px'}}>
            <input type="radio" value="daily" checked={view === 'daily'} onChange={() => setView('daily')} />
            Daily
          </label>
          <label>
            <input type="radio" value="monthly" checked={view === 'monthly'} onChange={() => setView('monthly')} />
            Monthly
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}> 
          <div style={{ marginBottom: '20px', width: '350px', height: 'auto' }}>
            <h4>Push-Ups Over Time</h4>
            <Line data={pushUpData} options={options} />
          </div>
          <div style={{ width: '350px', height: 'auto' }}>
            <h4>Squats Over Time</h4>
            <Line data={squatData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsModal;
