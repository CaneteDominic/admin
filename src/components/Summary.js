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

  const dates = Object.keys(summary.pushUpsByDate).sort();
  const formattedDates = dates.map(date => formatDate(date));
  const pushUps = dates.map(date => summary.pushUpsByDate[date] || 0);
  const squats = dates.map(date => summary.squatsByDate[date] || 0);

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
