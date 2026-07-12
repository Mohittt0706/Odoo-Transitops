import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const expenseService = {
  getAll: (params) => api.get(API_ENDPOINTS.EXPENSES, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.EXPENSES}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.EXPENSES, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.EXPENSES}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.EXPENSES}/${id}`),
  getVehicleSummary: (vehicleId) => api.get(`${API_ENDPOINTS.EXPENSES}/summary/vehicle/${vehicleId}`),
  getTripSummary: (tripId) => api.get(`${API_ENDPOINTS.EXPENSES}/summary/trip/${tripId}`),
};
