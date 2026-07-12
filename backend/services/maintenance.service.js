const Maintenance = require('../models/Maintenance');
const Vehicle = require('../models/Vehicle');
const { VEHICLE_STATUS } = require('../constants/vehicleStatus');

const create = async (data) => {
  const vehicle = await Vehicle.findById(data.vehicleId);
  if (!vehicle || vehicle.isActive === false) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }
  if (vehicle.status === 'RETIRED') {
    const error = new Error('Cannot create maintenance for a retired vehicle');
    error.statusCode = 400;
    throw error;
  }

  const activeMaintenance = await Maintenance.findOne({
    vehicleId: data.vehicleId,
    status: { $in: ['OPEN', 'IN_PROGRESS'] },
  });
  if (activeMaintenance) {
    const error = new Error('Vehicle already has an active maintenance record');
    error.statusCode = 400;
    throw error;
  }

  const maintenance = await Maintenance.create(data);

  await Vehicle.findByIdAndUpdate(data.vehicleId, { status: 'IN_SHOP' });

  return maintenance;
};

const findAll = async (query) => {
  const { search, status, vehicleId, date, sort, page, limit } = query;

  const filter = {};

  if (status) filter.status = status;
  if (vehicleId) filter.vehicleId = vehicleId;
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.maintenanceDate = { $gte: start, $lte: end };
  }
  if (search) {
    filter.$or = [
      { issue: { $regex: search, $options: 'i' } },
    ];
  }

  let sortObj = {};
  if (sort === 'latest') sortObj.createdAt = -1;
  else if (sort === 'oldest') sortObj.createdAt = 1;
  else if (sort === 'cost') sortObj.cost = -1;

  const skip = (page - 1) * limit;
  const [records, total] = await Promise.all([
    Maintenance.find(filter).populate('vehicleId', 'registrationNumber vehicleName').sort(sortObj).skip(skip).limit(limit),
    Maintenance.countDocuments(filter),
  ]);

  return {
    records,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findById = async (id) => {
  const record = await Maintenance.findById(id).populate('vehicleId', 'registrationNumber vehicleName status');
  if (!record) {
    const error = new Error('Maintenance record not found');
    error.statusCode = 404;
    throw error;
  }
  return record;
};

const update = async (id, data) => {
  const existing = await Maintenance.findById(id);
  if (!existing) {
    const error = new Error('Maintenance record not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.status === 'COMPLETED' && !data.completedDate) {
    data.completedDate = new Date();
  }

  const record = await Maintenance.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('vehicleId', 'registrationNumber vehicleName status');

  if (data.status === 'COMPLETED') {
    const vehicle = await Vehicle.findById(record.vehicleId);
    if (vehicle && vehicle.status !== 'RETIRED') {
      await Vehicle.findByIdAndUpdate(record.vehicleId, { status: 'AVAILABLE' });
    }
  }

  return record;
};

const remove = async (id) => {
  const record = await Maintenance.findById(id);
  if (!record) {
    const error = new Error('Maintenance record not found');
    error.statusCode = 404;
    throw error;
  }
  return record;
};

module.exports = { create, findAll, findById, update, remove };
