import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const fuelService = {
  getAll: (params) => api.get(API_ENDPOINTS.FUEL, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.FUEL}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.FUEL, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.FUEL}/${id}`, data),
  remove: (id) => api.delete(`${API_ENDPOINTS.FUEL}/${id}`),
  getVehicleSummary: (vehicleId) => api.get(`${API_ENDPOINTS.FUEL}/summary/vehicle/${vehicleId}`),
};
