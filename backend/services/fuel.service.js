const FuelLog = require('../models/FuelLog');
const Vehicle = require('../models/Vehicle');

const throwErr = (msg, code) => {
  const err = new Error(msg);
  err.statusCode = code;
  throw err;
};

const create = async (data) => {
  const vehicle = await Vehicle.findOne({ _id: data.vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);

  const fuelLog = await FuelLog.create(data);
  return fuelLog;
};

const getAll = async (query) => {
  const filter = {};

  if (query.vehicleId) filter.vehicleId = query.vehicleId;
  if (query.tripId) filter.tripId = query.tripId;

  if (query.dateFrom || query.dateTo) {
    filter.date = {};
    if (query.dateFrom) filter.date.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.date.$lte = new Date(query.dateTo);
  }

  let sortObj = {};
  if (query.sort === 'oldest') sortObj.date = 1;
  else if (query.sort === 'highestCost') sortObj.cost = -1;
  else if (query.sort === 'lowestCost') sortObj.cost = 1;
  else sortObj.date = -1;

  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    FuelLog.find(filter)
      .populate('vehicleId', 'registrationNumber vehicleName')
      .populate('tripId', 'source destination')
      .sort(sortObj)
      .skip(skip)
      .limit(limit),
    FuelLog.countDocuments(filter),
  ]);

  return {
    fuelLogs: logs,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};

const getById = async (id) => {
  const log = await FuelLog.findById(id)
    .populate('vehicleId', 'registrationNumber vehicleName')
    .populate('tripId', 'source destination');
  if (!log) throwErr('Fuel log not found', 404);
  return log;
};

const update = async (id, data) => {
  const log = await FuelLog.findById(id);
  if (!log) throwErr('Fuel log not found', 404);
  Object.assign(log, data);
  await log.save();
  return log;
};

const remove = async (id) => {
  const log = await FuelLog.findById(id);
  if (!log) throwErr('Fuel log not found', 404);
  await FuelLog.deleteOne({ _id: id });
  return log;
};

const getVehicleSummary = async (vehicleId) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);

  const [fuelLogs, fuelAgg] = await Promise.all([
    FuelLog.find({ vehicleId }).sort({ date: -1 }).populate('tripId', 'source destination'),
    FuelLog.aggregate([
      { $match: { vehicleId: vehicle._id } },
      {
        $group: {
          _id: null,
          totalLiters: { $sum: '$liters' },
          totalCost: { $sum: '$cost' },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const summary = fuelAgg[0] || { totalLiters: 0, totalCost: 0, count: 0 };
  return {
    vehicle: { _id: vehicle._id, registrationNumber: vehicle.registrationNumber, vehicleName: vehicle.vehicleName },
    summary: {
      totalLiters: summary.totalLiters,
      totalCost: summary.totalCost,
      totalLogs: summary.count,
      averageCostPerLiter: summary.totalLiters > 0 ? summary.totalCost / summary.totalLiters : 0,
    },
    recentLogs: fuelLogs.slice(0, 5),
  };
};

module.exports = { create, getAll, getById, update, remove, getVehicleSummary };
