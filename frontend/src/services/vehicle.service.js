import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const vehicleService = {
  getAll: (params) => api.get(API_ENDPOINTS.VEHICLES, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.VEHICLES}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.VEHICLES, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.VEHICLES}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.VEHICLES}/${id}`),
};
