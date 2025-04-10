import React from 'react';

function StatisticCard({ title, value, icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '36px',
        marginBottom: '10px',
        backgroundColor: `${color}20`,
        color: color,
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        margin: '0 0 5px',
        fontSize: '16px',
        color: '#555'
      }}>
        {title}
      </h3>
      
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        {value}
      </div>
    </div>
  );
}

export default StatisticCard;