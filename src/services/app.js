import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data.data;
};

export const fetchTags = async () => {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    return response.data.data;
  };

export const fetchCourses = async () => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data.data;
  };