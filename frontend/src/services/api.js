import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add JWT token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};
    
    if (status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    } 
    else if (status === 404) {
      return Promise.resolve({ data: null });
    }
    
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 404) {
      // Handle "not found" as deleted event
      return Promise.resolve({ data: null });
    }
    return Promise.reject(error);
  }
);

export default api;