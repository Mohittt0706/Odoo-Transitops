import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const tripService = {
  getAll: (params) => api.get(API_ENDPOINTS.TRIPS, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.TRIPS}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.TRIPS, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.TRIPS}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.TRIPS}/${id}`),
  dispatch: (id) => api.post(`${API_ENDPOINTS.TRIPS}/${id}/dispatch`),
  complete: (id, data) => api.post(`${API_ENDPOINTS.TRIPS}/${id}/complete`, data),
  cancel: (id) => api.post(`${API_ENDPOINTS.TRIPS}/${id}/cancel`),
  confirmDelivery: (id, data) => api.patch(`${API_ENDPOINTS.TRIPS}/${id}/confirm-delivery`, data),
};
