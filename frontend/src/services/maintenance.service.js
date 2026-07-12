import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const maintenanceService = {
  getAll: (params) => api.get(API_ENDPOINTS.MAINTENANCE, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.MAINTENANCE}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.MAINTENANCE, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.MAINTENANCE}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.MAINTENANCE}/${id}`),
};
