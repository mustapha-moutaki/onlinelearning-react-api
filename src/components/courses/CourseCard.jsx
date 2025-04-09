import React from 'react';

function CourseCard({ course, categories }) {
  const category = categories?.find(cat => cat.id === course.category_id);
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      margin: '10px 0'
    }}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      
      {category && (
        <p>
          <strong>Category:</strong> {category.name}
        </p>
      )}
      
      {course.video_url && (
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          {course.video_url && (
  <div style={{ marginTop: '15px', marginBottom: '15px' }}>
    <a 
      href={course.video_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        backgroundColor: '#FF0000',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}
    >
      <span style={{ marginRight: '5px' }}>▶</span> Watch Course
    </a>
  </div>
)}
        </div>
      )}
      
      {course.price !== undefined && <p><strong>Price:</strong> ${course.price}</p>}
    </div>
  );
}

export default CourseCard;