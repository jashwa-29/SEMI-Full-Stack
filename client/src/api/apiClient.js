import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract meaningful error message from backend response
    const message = 
      error.response?.data?.message || 
      error.message || 
      "An unexpected error occurred. Please try again.";
    
    // You can also handle global actions here (e.g., redirect to login on 401)
    
    // Attach the cleaned message to the error object so components can use it directly
    error.parsedMessage = message;
    
    return Promise.reject(error);
  }
);

export default apiClient;