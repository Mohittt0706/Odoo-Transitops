const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Receiver = require('../models/Receiver');
const FuelLog = require('../models/FuelLog');
const Expense = require('../models/Expense');
const Maintenance = require('../models/Maintenance');

const getDashboard = async (userRole) => {
  const [
    vehicleCounts,
    vehicleStatusSummary,
    driverCounts,
    driverStatusSummary,
    tripCounts,
    tripStatusSummary,
    receiverCount,
    fuelAgg,
    maintenanceAgg,
    expenseAgg,
    recentTrips,
    recentMaintenance,
    recentFuel,
    recentExpenses,
    maintenanceCounts,
  ] = await Promise.all([
    Vehicle.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          available: { $sum: { $cond: [{ $eq: ['$status', 'AVAILABLE'] }, 1, 0] } },
          onTrip: { $sum: { $cond: [{ $eq: ['$status', 'ON_TRIP'] }, 1, 0] } },
          inShop: { $sum: { $cond: [{ $eq: ['$status', 'IN_SHOP'] }, 1, 0] } },
          retired: { $sum: { $cond: [{ $eq: ['$status', 'RETIRED'] }, 1, 0] } },
        },
      },
    ]),
    Vehicle.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Driver.aggregate([
      { $match: { isActive: { $ne: false } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          onTrip: { $sum: { $cond: [{ $eq: ['$status', 'ON_TRIP'] }, 1, 0] } },
          available: { $sum: { $cond: [{ $eq: ['$status', 'AVAILABLE'] }, 1, 0] } },
          offDuty: { $sum: { $cond: [{ $eq: ['$status', 'OFF_DUTY'] }, 1, 0] } },
          suspended: { $sum: { $cond: [{ $eq: ['$status', 'SUSPENDED'] }, 1, 0] } },
        },
      },
    ]),
    Driver.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Trip.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          draft: { $sum: { $cond: [{ $eq: ['$status', 'DRAFT'] }, 1, 0] } },
          dispatched: { $sum: { $cond: [{ $eq: ['$status', 'DISPATCHED'] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$status', 'CANCELLED'] }, 1, 0] } },
        },
      },
    ]),
    Trip.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Receiver.countDocuments(),
    FuelLog.aggregate([
      {
        $group: {
          _id: null,
          totalLiters: { $sum: '$liters' },
          totalCost: { $sum: '$cost' },
          count: { $sum: 1 },
        },
      },
    ]),
    Maintenance.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: '$cost' },
          count: { $sum: 1 },
        },
      },
    ]),
    Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]),
    Trip.find({ isActive: true }).sort({ createdAt: -1 }).limit(5)
      .populate('vehicleId', 'registrationNumber vehicleName')
      .populate('driverId', 'fullName'),
    Maintenance.find().sort({ createdAt: -1 }).limit(5)
      .populate('vehicleId', 'registrationNumber vehicleName'),
    FuelLog.find().sort({ createdAt: -1 }).limit(5)
      .populate('vehicleId', 'registrationNumber vehicleName'),
    Expense.find().sort({ createdAt: -1 }).limit(5)
      .populate('vehicleId', 'registrationNumber vehicleName'),
    Maintenance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ]);

  const v = vehicleCounts[0] || { total: 0, available: 0, onTrip: 0, inShop: 0, retired: 0 };
  const d = driverCounts[0] || { total: 0, onTrip: 0, available: 0, offDuty: 0, suspended: 0 };
  const t = tripCounts[0] || { total: 0, draft: 0, dispatched: 0, completed: 0, cancelled: 0 };
  const fuel = fuelAgg[0] || { totalLiters: 0, totalCost: 0, count: 0 };
  const maint = maintenanceAgg[0] || { totalCost: 0, count: 0 };
  const expense = expenseAgg[0] || { totalAmount: 0, count: 0 };

  const totalOperationalCost = fuel.totalCost + maint.totalCost + expense.totalAmount;

  const vehicleScore = v.total > 0 ? (v.available / v.total) * 30 : 30;
  const maintenanceScore = v.total > 0 ? ((v.total - v.inShop) / v.total) * 25 : 25;
  const driverScore = d.total > 0 ? (d.available / d.total) * 25 : 25;
  const completionDenom = t.completed + t.cancelled;
  const completionRate = completionDenom > 0 ? (t.completed / completionDenom) * 20 : 20;
  const fleetHealthScore = Math.round(vehicleScore + maintenanceScore + driverScore + completionRate);

  const kpis = {
    totalVehicles: v.total,
    availableVehicles: v.available,
    vehiclesOnTrip: v.onTrip,
    vehiclesInMaintenance: v.inShop,
    totalDrivers: d.total,
    driversOnTrip: d.onTrip,
    availableDrivers: d.available,
    totalTrips: t.total,
    activeTrips: t.dispatched,
    completedTrips: t.completed,
    cancelledTrips: t.cancelled,
    totalReceivers: receiverCount,
    totalFuelCost: fuel.totalCost,
    totalMaintenanceCost: maint.totalCost,
    totalOperationalCost,
  };

  const fleetHealth = { fleetHealthScore };

  const analytics = {
    vehicleStatusSummary,
    driverStatusSummary,
    tripStatusSummary,
    fuelSummary: {
      totalLiters: fuel.totalLiters,
      totalCost: fuel.totalCost,
      totalLogs: fuel.count,
    },
    expenseSummary: expenseAgg.length > 0 ? expenseAgg[0] : { totalAmount: 0, count: 0 },
    maintenanceStatusSummary: maintenanceCounts,
  };

  const recentActivities = {
    trips: recentTrips,
    maintenance: recentMaintenance,
    fuelLogs: recentFuel,
    expenses: recentExpenses,
  };

  const quickActions = [
    { label: 'Create Vehicle', action: 'CREATE_VEHICLE', route: '/vehicles', method: 'POST' },
    { label: 'Create Driver', action: 'CREATE_DRIVER', route: '/drivers', method: 'POST' },
    { label: 'Create Trip', action: 'CREATE_TRIP', route: '/trips', method: 'POST' },
    { label: 'Schedule Maintenance', action: 'SCHEDULE_MAINTENANCE', route: '/maintenance', method: 'POST' },
  ];

  const dashboard = {
    kpis,
    fleetHealth,
    recentActivities,
    quickActions,
    analytics,
  };

  return applyRoleFilter(dashboard, userRole);
};

const applyRoleFilter = (dashboard, role) => {
  switch (role) {
    case 'OPERATION_LEAD':
      return dashboard;

    case 'FINANCE_HUB':
      return {
        kpis: {
          totalFuelCost: dashboard.kpis.totalFuelCost,
          totalMaintenanceCost: dashboard.kpis.totalMaintenanceCost,
          totalOperationalCost: dashboard.kpis.totalOperationalCost,
        },
        analytics: {
          fuelSummary: dashboard.analytics.fuelSummary,
          expenseSummary: dashboard.analytics.expenseSummary,
        },
        recentActivities: {
          fuelLogs: dashboard.recentActivities.fuelLogs,
          expenses: dashboard.recentActivities.expenses,
        },
        quickActions: [],
      };

    case 'SAFETY_OFFICER':
      return {
        kpis: {
          totalVehicles: dashboard.kpis.totalVehicles,
          vehiclesInMaintenance: dashboard.kpis.vehiclesInMaintenance,
          totalDrivers: dashboard.kpis.totalDrivers,
          availableDrivers: dashboard.kpis.availableDrivers,
          driversOnTrip: dashboard.kpis.driversOnTrip,
          activeTrips: dashboard.kpis.activeTrips,
        },
        fleetHealth: dashboard.fleetHealth,
        analytics: {
          vehicleStatusSummary: dashboard.analytics.vehicleStatusSummary,
          driverStatusSummary: dashboard.analytics.driverStatusSummary,
          tripStatusSummary: dashboard.analytics.tripStatusSummary,
        },
        recentActivities: {
          trips: dashboard.recentActivities.trips,
          maintenance: dashboard.recentActivities.maintenance,
        },
        quickActions: [],
      };

    case 'ROAD_CAPTAIN':
      return {
        kpis: {
          totalTrips: dashboard.kpis.totalTrips,
          activeTrips: dashboard.kpis.activeTrips,
          completedTrips: dashboard.kpis.completedTrips,
        },
        recentActivities: {
          trips: dashboard.recentActivities.trips,
          fuelLogs: dashboard.recentActivities.fuelLogs,
        },
        quickActions: [{ label: 'Create Trip', action: 'CREATE_TRIP', route: '/trips', method: 'POST' }],
      };

    case 'DESTINATION_CONTROL':
      return {
        kpis: {
          totalTrips: dashboard.kpis.totalTrips,
          completedTrips: dashboard.kpis.completedTrips,
          totalReceivers: dashboard.kpis.totalReceivers,
        },
        recentActivities: {
          trips: dashboard.recentActivities.trips,
        },
        quickActions: [],
      };

    default:
      return {
        kpis: dashboard.kpis,
        recentActivities: dashboard.recentActivities,
        quickActions: [],
      };
  }
};

module.exports = { getDashboard };
