import apiClient from '../lib/api-client';

/**
 * Service for Chat History & Records
 * Communicates with /api/chats endpoints
 */
export const chatService = {
  /**
   * Fetch all closed chat records with pagination
   * @param {Object} params - Query parameters (page, limit)
   */
  async getHistory(params = {}) {
    return apiClient.get('/chats/history', { params });
  },

  /**
   * Fetch single chat details (message history)
   * @param {string} id 
   */
  async getById(id) {
    return apiClient.get(`/chats/${id}`);
  },

  /**
   * Fetch unique categories used in chats
   */
  async getCategories() {
    return apiClient.get('/chats/categories');
  }
};
