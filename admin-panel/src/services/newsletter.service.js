import apiClient from '../lib/api-client';

/**
 * Newsletter Management Service
 */
export const newsletterService = {
  /**
   * Get all newsletter subscribers
   */
  getSubscribers: () => apiClient.get('/newsletter'),

  /**
   * Unsubscribe a user
   * @param {string} email 
   */
  unsubscribe: (email) => apiClient.put('/newsletter/unsubscribe', { email }),
};

export default newsletterService;
