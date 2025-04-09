// src/components/CourseList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching courses...');
    axios.get('http://127.0.0.1:8000/api/courses')
      .then(response => {
        console.log('API response:', response.data);
        setCourses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div>
          {courses.map((course, index) => (
            <CourseCard key={course.id || index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;