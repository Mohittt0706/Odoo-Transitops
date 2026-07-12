import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const receiverService = {
  getAll: (params) => api.get(API_ENDPOINTS.RECEIVERS, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.RECEIVERS}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.RECEIVERS, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.RECEIVERS}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.RECEIVERS}/${id}`),
};
