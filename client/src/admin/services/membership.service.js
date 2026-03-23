import apiClient from '../lib/api-client';

/**
 * Membership Management Service
 */
export const membershipService = {
  /**
   * Get all membership applications
   */
  getAll: () => apiClient.get('/membership'),

  /**
   * Update a membership application (data or status)
   * @param {string} id 
   * @param {Object} data 
   */
  update: (id, data) => apiClient.put(`/membership/${id}`, data),

  /**
   * Delete a membership application
   * @param {string} id 
   */
  delete: (id) => apiClient.delete(`/membership/${id}`),

  /**
   * Get single membership details
   * @param {string} id 
   */
  getById: (id) => apiClient.get(`/membership/${id}`),
};

export default membershipService;
