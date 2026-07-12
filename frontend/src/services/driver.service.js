import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const driverService = {
  getAll: (params) => api.get(API_ENDPOINTS.DRIVERS, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.DRIVERS}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.DRIVERS, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.DRIVERS}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.DRIVERS}/${id}`),
};
