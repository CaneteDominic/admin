import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { fetchSummary } from '../api/api'; 
import './AdminDashboard.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [view, setView] = useState('daily');

  useEffect(() => {
    const getSummary = async () => {
      const data = await fetchSummary();
      setSummary(data);
    };

    getSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

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
        monthlyData[month] = 0;
      }
      monthlyData[month] += data[date] || 0;
    });
    return monthlyData;
  };

  const formatMonthlyDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    return `${month}/01`;
  };

  const dates = Object.keys(summary.pushUpsByDate).sort();
  const formattedDates = view === 'daily' ? dates.map(date => formatDate(date)) : Object.keys(aggregateMonthlyData(summary.pushUpsByDate)).sort().map(date => formatMonthlyDate(date));

  const pushUps = view === 'daily' ? dates.map(date => summary.pushUpsByDate[date] || 0) : Object.values(aggregateMonthlyData(summary.pushUpsByDate)).map(month => month || 0);
  const squats = view === 'daily' ? dates.map(date => summary.squatsByDate[date] || 0) : Object.values(aggregateMonthlyData(summary.squatsByDate)).map(month => month || 0);

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
    <div>
      <h1>Data Summary</h1>
      <div className="summary-container">
        <div className="summary-item">
          <div><strong>User Count</strong> </div>
          <div>{summary.userCount}</div>
        </div>
        <div className="summary-item">
          <div><strong>Total Push-Ups:</strong> </div>
          <div>{summary.totalPushUps}</div>
        </div>
        <div className="summary-item">
          <div><strong>Total Squats:</strong></div> 
          <div>{summary.totalSquats}</div>
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

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}> 
        <div style={{ marginBottom: '10px',width: '500px', height: '400px' }}>
            <h3>Push-Ups Over Time</h3>
            <Line data={pushUpData} options={options} />
        </div>
        <div style={{width: '500px', height: '400px'}}>
            <h3>Squats Over Time</h3>
            <Line data={squatData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
