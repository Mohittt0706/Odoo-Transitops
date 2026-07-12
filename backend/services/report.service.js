const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const FuelLog = require('../models/FuelLog');
const Expense = require('../models/Expense');
const Maintenance = require('../models/Maintenance');

const buildDateFilter = (query) => {
  const filter = {};
  if (query.dateFrom || query.dateTo) {
    filter.createdAt = {};
    if (query.dateFrom) filter.createdAt.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.createdAt.$lte = new Date(query.dateTo);
  }
  return filter;
};

const fleet = async (query) => {
  const dateFilter = buildDateFilter(query);
  const vehicles = await Vehicle.find({ isActive: { $ne: false } });
  const total = vehicles.length;
  const available = vehicles.filter(v => v.status === 'AVAILABLE').length;
  const onTrip = vehicles.filter(v => v.status === 'ON_TRIP').length;
  const inShop = vehicles.filter(v => v.status === 'IN_SHOP').length;
  const retired = vehicles.filter(v => v.status === 'RETIRED').length;
  const inUse = onTrip + inShop;
  const utilization = total > 0 ? Math.round((inUse / total) * 100) : 0;
  return { totalVehicles: total, availableVehicles: available, vehiclesOnTrip: onTrip, vehiclesInMaintenance: inShop, retiredVehicles: retired, vehicleUtilization: utilization };
};

const trips = async (query) => {
  const dateFilter = buildDateFilter(query);
  const match = { ...dateFilter, isActive: true };
  if (query.vehicleId) match.vehicleId = query.vehicleId;
  if (query.driverId) match.driverId = query.driverId;
  if (query.status) match.status = query.status;

  const allTrips = await Trip.find(match);
  const total = allTrips.length;
  const completed = allTrips.filter(t => t.status === 'COMPLETED').length;
  const cancelled = allTrips.filter(t => t.status === 'CANCELLED').length;
  const active = allTrips.filter(t => t.status === 'DISPATCHED').length;
  const completedTrips = allTrips.filter(t => t.status === 'COMPLETED' && t.actualDistance > 0);
  const avgDistance = completedTrips.length > 0 ? Math.round(completedTrips.reduce((s, t) => s + t.actualDistance, 0) / completedTrips.length) : 0;
  const avgCargo = allTrips.length > 0 ? Math.round(allTrips.reduce((s, t) => s + t.cargoWeight, 0) / allTrips.length) : 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { totalTrips: total, completedTrips: completed, cancelledTrips: cancelled, activeTrips: active, averageTripDistance: avgDistance, averageCargoWeight: avgCargo, tripCompletionRate: completionRate };
};

const drivers = async (query) => {
  const dateFilter = buildDateFilter(query);
  const allDrivers = await Driver.find({ isActive: { $ne: false } });
  const total = allDrivers.length;
  const available = allDrivers.filter(d => d.status === 'AVAILABLE').length;
  const onTrip = allDrivers.filter(d => d.status === 'ON_TRIP').length;
  const suspended = allDrivers.filter(d => d.status === 'SUSPENDED').length;
  const expiredLicenses = allDrivers.filter(d => d.licenseExpiry && new Date(d.licenseExpiry) < new Date()).length;
  const avgSafety = total > 0 ? Math.round(allDrivers.reduce((s, d) => s + (d.safetyScore || 0), 0) / total) : 0;
  return { totalDrivers: total, availableDrivers: available, driversOnTrip: onTrip, suspendedDrivers: suspended, expiredLicenses, averageSafetyScore: avgSafety };
};

const finance = async (query) => {
  const fuelMatch = buildDateFilter(query);
  const expenseMatch = buildDateFilter(query);
  const maintMatch = buildDateFilter(query);

  if (query.vehicleId) {
    fuelMatch.vehicleId = query.vehicleId;
    expenseMatch.vehicleId = query.vehicleId;
    maintMatch.vehicleId = query.vehicleId;
  }

  const fuelAgg = await FuelLog.aggregate([
    { $match: fuelMatch },
    { $group: { _id: null, total: { $sum: '$cost' } } },
  ]);
  const fuelCost = fuelAgg.length > 0 ? fuelAgg[0].total : 0;

  const expenseAgg = await Expense.aggregate([
    { $match: expenseMatch },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  const otherExpenses = expenseAgg.length > 0 ? expenseAgg[0].total : 0;

  const maintAgg = await Maintenance.aggregate([
    { $match: maintMatch },
    { $group: { _id: null, total: { $sum: '$cost' } } },
  ]);
  const maintCost = maintAgg.length > 0 ? maintAgg[0].total : 0;

  const totalOperationalCost = fuelCost + maintCost + otherExpenses;

  const vehicleCount = await Vehicle.countDocuments({ isActive: { $ne: false } });
  const costPerVehicle = vehicleCount > 0 ? Math.round(totalOperationalCost / vehicleCount) : 0;

  const tripCount = await Trip.countDocuments({ isActive: true, ...buildDateFilter(query) });
  const costPerTrip = tripCount > 0 ? Math.round(totalOperationalCost / tripCount) : 0;

  const totalAcquisition = await Vehicle.aggregate([
    { $match: { isActive: { $ne: false } } },
    { $group: { _id: null, total: { $sum: '$acquisitionCost' } } },
  ]);
  const totalInvestment = totalAcquisition.length > 0 ? totalAcquisition[0].total : 0;
  const roi = totalInvestment > 0 ? Math.round(((totalOperationalCost * 2 - totalOperationalCost) / totalInvestment) * 100) : 0;

  return { fuelCost: Math.round(fuelCost), maintenanceCost: Math.round(maintCost), otherExpenses: Math.round(otherExpenses), totalOperationalCost: Math.round(totalOperationalCost), costPerVehicle, costPerTrip, roi };
};

const maintenance = async (query) => {
  const dateFilter = buildDateFilter(query);
  const match = { ...dateFilter };
  if (query.vehicleId) match.vehicleId = query.vehicleId;
  if (query.status) match.status = query.status;

  const allMaint = await Maintenance.find(match);
  const total = allMaint.length;
  const completed = allMaint.filter(m => m.status === 'COMPLETED').length;
  const pending = allMaint.filter(m => m.status === 'OPEN' || m.status === 'IN_PROGRESS').length;
  const avgCost = total > 0 ? Math.round(allMaint.reduce((s, m) => s + m.cost, 0) / total) : 0;
  return { maintenanceCount: total, completedMaintenance: completed, pendingMaintenance: pending, averageMaintenanceCost: avgCost };
};

const overview = async (query) => {
  const [fleetData, tripData, driverData, financeData, maintData] = await Promise.all([
    fleet(query),
    trips(query),
    drivers(query),
    finance(query),
    maintenance(query),
  ]);
  const avgFuelEfficiency = fleetData.totalVehicles > 0 ? Math.round((tripData.averageTripDistance || 0) / Math.max(financeData.fuelCost, 1) * 100) : 0;
  const fleetHealth = Math.round((fleetData.vehicleUtilization + tripData.tripCompletionRate + driverData.averageSafetyScore) / 3);
  return {
    fleet: fleetData,
    trips: tripData,
    drivers: driverData,
    finance: financeData,
    maintenance: maintData,
    analytics: {
      fleetUtilization: fleetData.vehicleUtilization,
      tripCompletionRate: tripData.tripCompletionRate,
      averageFuelEfficiency: avgFuelEfficiency,
      averageOperationalCost: financeData.totalOperationalCost,
      roi: financeData.roi,
      fleetHealthScore: fleetHealth,
    },
  };
};

module.exports = { overview, fleet, trips, drivers, finance, maintenance };