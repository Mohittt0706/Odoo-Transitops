import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const reportService = {
  overview: (params) => api.get(API_ENDPOINTS.REPORTS.OVERVIEW, { params }),
  fleet: (params) => api.get(API_ENDPOINTS.REPORTS.FLEET, { params }),
  trips: (params) => api.get(API_ENDPOINTS.REPORTS.TRIPS, { params }),
  drivers: (params) => api.get(API_ENDPOINTS.REPORTS.DRIVERS, { params }),
  finance: (params) => api.get(API_ENDPOINTS.REPORTS.FINANCE, { params }),
  maintenance: (params) => api.get(API_ENDPOINTS.REPORTS.MAINTENANCE, { params }),
  exportCSV: (params) =>
    api.get(API_ENDPOINTS.REPORTS.EXPORT_CSV, { params, responseType: 'blob' }),
  exportPDF: (params) =>
    api.get(API_ENDPOINTS.REPORTS.EXPORT_PDF, { params, responseType: 'blob' }),
};
