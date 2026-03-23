import apiClient from '../lib/api-client';

/**
 * Authentication and Admin Management Service
 */
export const authService = {
  /**
   * Login to admin panel
   * @param {Object} credentials - { email, password }
   */
  login: (credentials) => apiClient.post('/auth/login', credentials),

  /**
   * Get all admin users (Super Admin only)
   */
  getAdmins: () => apiClient.get('/auth/admins'),

  /**
   * Create a new admin user
   * @param {Object} adminData 
   */
  createAdmin: (adminData) => apiClient.post('/auth/create-admin', adminData),

  /**
   * Delete an admin user
   * @param {string} id 
   */
  deleteAdmin: (id) => apiClient.delete(`/auth/admin/${id}`),

  /**
   * Get current user profile (verify token)
   */
  getProfile: () => apiClient.get('/auth/profile'),
};

export default authService;
