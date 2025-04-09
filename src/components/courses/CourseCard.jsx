import React from 'react';

function CourseCard({ course }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      margin: '10px 0'
    }}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      {course.instructor && <p><strong>Instructor:</strong> {course.instructor}</p>}
      {course.price !== undefined && <p><strong>Price:</strong> ${course.price}</p>}
    </div>
  );
}

export default CourseCard;