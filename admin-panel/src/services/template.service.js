import apiClient from '../lib/api-client';

const getTemplates = () => apiClient.get('/templates');

const updateTemplate = (id, data) => apiClient.put(`/templates/${id}`, data);

const setDefaultTemplate = (id) => apiClient.put(`/templates/${id}/set-default`);

export default {
  getTemplates,
  updateTemplate,
  setDefaultTemplate
};
