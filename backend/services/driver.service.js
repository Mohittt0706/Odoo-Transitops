const Driver = require('../models/Driver');

const create = async (data) => {
  if (data.licenseExpiry && new Date(data.licenseExpiry) < new Date()) {
    const error = new Error('Cannot create driver with an expired license');
    error.statusCode = 400;
    throw error;
  }
  const driver = await Driver.create(data);
  return driver;
};

const findAll = async (query) => {
  const { search, status, licenseCategory, sort, page, limit } = query;

  const filter = { isActive: { $ne: false } };

  if (status) filter.status = status;
  if (licenseCategory) filter.licenseCategory = licenseCategory;
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { licenseNumber: { $regex: search, $options: 'i' } },
    ];
  }

  let sortObj = {};
  if (sort === 'latest') sortObj.createdAt = -1;
  else if (sort === 'oldest') sortObj.createdAt = 1;
  else if (sort === 'name') sortObj.fullName = 1;

  const skip = (page - 1) * limit;
  const [drivers, total] = await Promise.all([
    Driver.find(filter).sort(sortObj).skip(skip).limit(limit),
    Driver.countDocuments(filter),
  ]);

  return {
    drivers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findById = async (id) => {
  const driver = await Driver.findById(id);
  if (!driver || driver.isActive === false) {
    const error = new Error('Driver not found');
    error.statusCode = 404;
    throw error;
  }
  return driver;
};

const update = async (id, data) => {
  const existing = await Driver.findById(id);
  if (!existing || existing.isActive === false) {
    const error = new Error('Driver not found');
    error.statusCode = 404;
    throw error;
  }
  if (existing.status === 'SUSPENDED') {
    const error = new Error('Cannot update a suspended driver');
    error.statusCode = 400;
    throw error;
  }
  if (data.licenseExpiry && new Date(data.licenseExpiry) < new Date()) {
    const error = new Error('Cannot set an expired license date');
    error.statusCode = 400;
    throw error;
  }
  const driver = await Driver.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return driver;
};

const remove = async (id) => {
  const driver = await Driver.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!driver) {
    const error = new Error('Driver not found');
    error.statusCode = 404;
    throw error;
  }
  return driver;
};

module.exports = { create, findAll, findById, update, remove };
