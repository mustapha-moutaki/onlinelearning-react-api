import React from 'react';

function CategoryCard({ category, onEdit }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{category.name}</h3>
      {category.description && <p>{category.description}</p>}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        marginTop: '15px'
      }}>
        <button
          onClick={onEdit}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;