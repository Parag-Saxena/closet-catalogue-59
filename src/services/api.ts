
import axios from 'axios';

// We'll use a dummy API URL for now - this would be replaced with a real API endpoint
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // You could add authorization headers here
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global error cases
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.data);
      
      // Handle authentication errors (401, 403)
      if (error.response.status === 401 || error.response.status === 403) {
        // Redirect to login or refresh token
        // window.location.href = '/sign-in';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const api = {
  // Generic API methods
  get: <T>(endpoint: string, params = {}) => 
    apiClient.get<T>(endpoint, { params }).then(response => response.data),
    
  post: <T>(endpoint: string, data = {}) => 
    apiClient.post<T>(endpoint, data).then(response => response.data),
    
  put: <T>(endpoint: string, data = {}) => 
    apiClient.put<T>(endpoint, data).then(response => response.data),
    
  patch: <T>(endpoint: string, data = {}) => 
    apiClient.patch<T>(endpoint, data).then(response => response.data),
    
  delete: <T>(endpoint: string) => 
    apiClient.delete<T>(endpoint).then(response => response.data),
    
  // Clothing-specific methods
  clothing: {
    getAll: () => api.get('/clothing'),
    getById: (id: string) => api.get(`/clothing/${id}`),
    create: (data: any) => api.post('/clothing', data),
    update: (id: string, data: any) => api.put(`/clothing/${id}`, data),
    delete: (id: string) => api.delete(`/clothing/${id}`),
    toggleLaundry: (id: string) => api.patch(`/clothing/${id}/toggle-laundry`),
  },
  
  // Categories-specific methods
  categories: {
    getAll: () => api.get('/categories'),
    create: (data: any) => api.post('/categories', data),
    update: (id: string, data: any) => api.put(`/categories/${id}`, data),
    delete: (id: string) => api.delete(`/categories/${id}`),
  },
  
  // Outfits-specific methods
  outfits: {
    getAll: () => api.get('/outfits'),
    getById: (id: string) => api.get(`/outfits/${id}`),
    create: (data: any) => api.post('/outfits', data),
    update: (id: string, data: any) => api.put(`/outfits/${id}`, data),
    delete: (id: string) => api.delete(`/outfits/${id}`),
  }
};

export default api;
