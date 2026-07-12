const allNotifications = [];
const maintenanceAlerts = [];
const tripAlerts = [];
const licenseAlerts = [];
const financialAlerts = [];

const notificationStats = {
  total: 0,
  unread: 0,
  critical: 0,
  trip: 0,
  maintenance: 0,
  financial: 0,
  license: 0,
  archived: 0,
};

const monthlyTrend = [];

export { allNotifications, maintenanceAlerts, tripAlerts, licenseAlerts, financialAlerts, notificationStats, monthlyTrend };
