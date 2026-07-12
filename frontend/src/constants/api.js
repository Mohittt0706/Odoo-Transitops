export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  VEHICLES: '/vehicles',
  DRIVERS: '/drivers',
  RECEIVERS: '/receivers',
  TRIPS: '/trips',
  MAINTENANCE: '/maintenance',
  FUEL: '/fuel',
  EXPENSES: '/expenses',
  DASHBOARD: '/dashboard',
  REPORTS: {
    OVERVIEW: '/reports/overview',
    FLEET: '/reports/fleet',
    TRIPS: '/reports/trips',
    DRIVERS: '/reports/drivers',
    FINANCE: '/reports/finance',
    MAINTENANCE: '/reports/maintenance',
    EXPORT_CSV: '/reports/export/csv',
    EXPORT_PDF: '/reports/export/pdf',
  },
  NOTIFICATIONS: '/notifications',
};

export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};
