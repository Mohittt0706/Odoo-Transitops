const Vehicle = require('../models/Vehicle');

const create = async (data) => {
  const existing = await Vehicle.findOne({
    registrationNumber: data.registrationNumber.toUpperCase(),
    isActive: true,
  });
  if (existing) {
    throw Object.assign(
      new Error('A vehicle with this registration number already exists'),
      { statusCode: 409 }
    );
  }

  const vehicle = await Vehicle.create(data);
  return vehicle;
};

const getAll = async (query) => {
  const filter = { isActive: true };

  if (query.search) {
    const regex = new RegExp(query.search, 'i');
    filter.$or = [{ registrationNumber: regex }, { vehicleName: regex }];
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.vehicleType) {
    filter.vehicleType = query.vehicleType;
  }

  let sortOption = {};
  if (query.sort === 'oldest') {
    sortOption = { createdAt: 1 };
  } else if (query.sort === 'vehicleName') {
    sortOption = { vehicleName: 1 };
  } else {
    sortOption = { createdAt: -1 };
  }

  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [vehicles, total] = await Promise.all([
    Vehicle.find(filter).sort(sortOption).skip(skip).limit(limit),
    Vehicle.countDocuments(filter),
  ]);

  return {
    vehicles,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getById = async (id) => {
  const vehicle = await Vehicle.findOne({ _id: id, isActive: true });
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }
  return vehicle;
};

const update = async (id, data) => {
  const vehicle = await Vehicle.findOne({ _id: id, isActive: true });
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }

  if (data.registrationNumber) {
    const duplicate = await Vehicle.findOne({
      _id: { $ne: id },
      registrationNumber: data.registrationNumber.toUpperCase(),
      isActive: true,
    });
    if (duplicate) {
      throw Object.assign(
        new Error('A vehicle with this registration number already exists'),
        { statusCode: 409 }
      );
    }
  }

  Object.assign(vehicle, data);
  await vehicle.save();
  return vehicle;
};

const remove = async (id) => {
  const vehicle = await Vehicle.findOne({ _id: id, isActive: true });
  if (!vehicle) {
    throw Object.assign(new Error('Vehicle not found'), { statusCode: 404 });
  }

  vehicle.isActive = false;
  await vehicle.save();
  return vehicle;
};

module.exports = { create, getAll, getById, update, remove };
