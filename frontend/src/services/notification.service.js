import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const notificationService = {
  getAll: (params) => api.get(API_ENDPOINTS.NOTIFICATIONS, { params }),
  create: (data) => api.post(API_ENDPOINTS.NOTIFICATIONS, data),
  markAsRead: (id) => api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`),
  remove: (id) => api.delete(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`),
};
