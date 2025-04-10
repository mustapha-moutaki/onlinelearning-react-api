  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import CourseCard from './CourseCard';

  function CourseList() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({
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
      setFormData({
        ...formData,
        [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
      });
    };

    const openAddModal = () => {
      setFormData({
        title: '',
        description: '',
        category_id: '',
        video_url: '',
        price: ''
      });
      setFormError(null);
      setIsAddModalOpen(true);
    };

    const openEditModal = (course) => {
      setCurrentCourse(course);
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category_id: course.category_id?.toString() || '',
        video_url: course.video_url || '',
        price: course.price || ''
      });
      setFormError(null);
      setIsEditModalOpen(true);
    };

    const handleDeleteCourse = (courseId) => {
      setLoading(true);
      axios
        .delete(`http://127.0.0.1:8000/api/courses/${courseId}`)
        .then((response) => {
          console.log('Course deleted:', response.data);
          fetchData();
        })
        .catch((error) => {
          console.error('Error deleting course:', error);
          setError('Failed to delete course');
          setLoading(false);
        });
    };

    const preprocessFormData = (data) => {
      const processedData = { ...data };
      
      if (processedData.category_id) {
        processedData.category_id = parseInt(processedData.category_id, 10);
      }
      
      if (processedData.price !== '') {
        processedData.price = parseFloat(processedData.price);
      }
      
      return processedData;
    };

    const handleAddCourse = async (e) => {
      e.preventDefault();
      setFormError(null);
      
      try {
        const processedData = preprocessFormData(formData);
        console.log('Sending course data:', processedData);
        
        const response = await axios.post('http://127.0.0.1:8000/api/courses', processedData);
        console.log('Course added:', response.data);
        setIsAddModalOpen(false);
        fetchData();
      } catch (error) {
        console.error('Error adding course:', error);
        
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
          setFormError(`Validation error: ${errorMessages}`);
        } else {
          setFormError('Failed to add course. Please check your input and try again.');
        }
      }
    };

    const handleEditCourse = async (e) => {
      e.preventDefault();
      if (!currentCourse) return;
      
      setFormError(null);
      
      try {
        const processedData = preprocessFormData(formData);
        console.log('Sending updated course data:', processedData);
        
        const response = await axios.put(`http://127.0.0.1:8000/api/courses/${currentCourse.id}`, processedData);
        console.log('Course updated:', response.data);
        setIsEditModalOpen(false);
        fetchData();
      } catch (error) {
        console.error('Error updating course:', error);
        
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
          setFormError(`Validation error: ${errorMessages}`);
        } else {
          setFormError('Failed to update course. Please check your input and try again.');
        }
      }
    };

    // Search functionality
    const handleSearchChange = (e) => {
      setSearchKeyword(e.target.value);
    };

    const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchKeyword.trim()) {
        // If search is empty, fetch all courses
        fetchData();
        return;
      }

      setIsSearching(true);
      setLoading(true);
      
      try {
        console.log('Searching courses with keyword:', searchKeyword);
        const response = await axios.get(`http://127.0.0.1:8000/api/V3/courses/search?keyword=${encodeURIComponent(searchKeyword)}`);
        console.log('Search results:', response.data);
        
        setCourses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
        setIsSearching(false);
      } catch (error) {
        console.error('Error searching courses:', error);
        setError('Failed to search courses');
        setLoading(false);
        setIsSearching(false);
      }
    };

    const clearSearch = () => {
      setSearchKeyword('');
      fetchData();
    };

    if (loading && courses.length === 0) return <p>Loading courses...</p>;
    if (error && courses.length === 0) return <p>Error: {error}</p>;

    return (
      <div>
        {/* Search bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '20px', 
          background: 'white', 
          padding: '10px', 
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search courses by title or description..."
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '4px 0 0 4px',
                fontSize: '16px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#A855F7',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
              }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
          
          {searchKeyword && (
            <button
              onClick={clearSearch}
              style={{
                backgroundColor: 'transparent',
                color: '#666',
                padding: '10px 15px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>
            {searchKeyword ? `Search Results for "${searchKeyword}"` : 'Available Courses'}
          </h2>
          <button 
            onClick={openAddModal}
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
          <p>{searchKeyword ? `No courses found matching "${searchKeyword}"` : 'No courses available'}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {courses.map((course, index) => (
              <CourseCard 
                key={course.id || index} 
                course={course} 
                categories={categories} 
                onEdit={() => openEditModal(course)}
                onDelete={() => handleDeleteCourse(course.id)}
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
              
              {formError && (
                <div style={{ 
                  backgroundColor: '#ffebee', 
                  color: '#c62828', 
                  padding: '10px', 
                  marginBottom: '15px', 
                  borderRadius: '4px' 
                }}>
                  {formError}
                </div>
              )}
              
              <form onSubmit={handleAddCourse}>
                {/* Title */}
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
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
                    value={formData.description}
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
                    value={formData.category_id}
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
                    value={formData.video_url}
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
                    value={formData.price}
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

        {/* Edit Course Modal */}
        {isEditModalOpen && (
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
              <h3>Edit Course</h3>
              
              {formError && (
                <div style={{ 
                  backgroundColor: '#ffebee', 
                  color: '#c62828', 
                  padding: '10px', 
                  marginBottom: '15px', 
                  borderRadius: '4px' 
                }}>
                  {formError}
                </div>
              )}
              
              <form onSubmit={handleEditCourse}>
                {/* Title */}
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="edit-title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                {/* Description */}
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="edit-description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                  />
                </div>
                
                {/* Category */}
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="edit-category_id" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                  <select
                    id="edit-category_id"
                    name="category_id"
                    value={formData.category_id}
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
                  <label htmlFor="edit-video_url" style={{ display: 'block', marginBottom: '5px' }}>Video URL:</label>
                  <input
                    type="url"
                    id="edit-video_url"
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                {/* Price */}
                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="edit-price" style={{ display: 'block', marginBottom: '5px' }}>Price ($):</label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={formData.price}
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
                    onClick={() => setIsEditModalOpen(false)}
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
                    Update Course
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