import apiClient from '../lib/api-client';

/**
 * System Context & Health Service
 */
export const systemService = {
  /**
   * Get dynamic health status of the backend & database
   */
  getHealth: () => apiClient.get('/health'),
};

export default systemService;
