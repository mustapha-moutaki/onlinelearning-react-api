// src/pages/Statistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticCard from '../components/statistics/StatisticCard';

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        console.log('Fetching statistics...');
        const response = await axios.get('http://127.0.0.1:8000/api/statistics');
        console.log('Statistics API response:', response.data);
        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load statistics data');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!statistics) return <p>No statistics available</p>;

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Dashboard Statistics</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {statistics.total_courses !== undefined && (
          <StatisticCard 
            title="Total Courses" 
            value={statistics.total_courses} 
            icon="📚" 
            color="#4CAF50" 
          />
        )}
        
        {statistics.total_categories !== undefined && (
          <StatisticCard 
            title="Total Categories" 
            value={statistics.total_categories} 
            icon="📁" 
            color="#2196F3" 
          />
        )}
        
        {statistics.total_users !== undefined && (
          <StatisticCard 
            title="Total Users" 
            value={statistics.total_users} 
            icon="👥" 
            color="#FFC107" 
          />
        )}
        
        {statistics.total_tags !== undefined && (
          <StatisticCard 
            title="Total Tags" 
            value={statistics.total_tags} 
            icon="🏷️" 
            color="#9C27B0" 
          />
        )}
      </div>
    </div>
  );
}

export default Statistics;