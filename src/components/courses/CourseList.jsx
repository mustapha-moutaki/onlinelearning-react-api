import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category_id: '',
    video_url: '',
    price: ''
  });

  const fetchData = async () => {
    try {
      console.log('Fetching courses and categories...');
      
      const [coursesResponse, categoriesResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/courses'),
        axios.get('http://127.0.0.1:8000/api/categories')
      ]);
      
      setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
      setCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/courses', newCourse);
      console.log('Course added:', response.data);
      
      // Reset form and close modal
      setNewCourse({
        title: '',
        description: '',
        category_id: '',
        video_url: '',
        price: ''
      });
      setIsAddModalOpen(false);
      
      // Refresh courses list
      fetchData();
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Available Courses</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div>
          {courses.map((course, index) => (
            <CourseCard 
              key={course.id || index} 
              course={course} 
              categories={categories} 
            />
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>Add New Course</h3>
            <form onSubmit={handleAddCourse}>
              {/* Title */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              {/* Description */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                />
              </div>
              
              {/* Category */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="category_id" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={newCourse.category_id}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Video URL */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="video_url" style={{ display: 'block', marginBottom: '5px' }}>Video URL:</label>
                <input
                  type="url"
                  id="video_url"
                  name="video_url"
                  value={newCourse.video_url}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              {/* Price */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newCourse.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '8px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '8px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseList;