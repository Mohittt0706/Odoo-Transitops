import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const dashboardService = {
  getDashboard: () => api.get(API_ENDPOINTS.DASHBOARD),
};
