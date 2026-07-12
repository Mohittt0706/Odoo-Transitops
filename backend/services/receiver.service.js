const Receiver = require('../models/Receiver');

const create = async (data) => {
  const receiver = await Receiver.create(data);
  return receiver;
};

const findAll = async (query) => {
  const { search, company, date, sort, page, limit } = query;

  const filter = {};

  if (company) filter.company = company;
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lte: end };
  }
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  let sortObj = {};
  if (sort === 'latest') sortObj.createdAt = -1;
  else if (sort === 'oldest') sortObj.createdAt = 1;
  else if (sort === 'name') sortObj.fullName = 1;

  const skip = (page - 1) * limit;
  const [receivers, total] = await Promise.all([
    Receiver.find(filter).sort(sortObj).skip(skip).limit(limit),
    Receiver.countDocuments(filter),
  ]);

  return {
    receivers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findById = async (id) => {
  const receiver = await Receiver.findById(id);
  if (!receiver) {
    const error = new Error('Receiver not found');
    error.statusCode = 404;
    throw error;
  }
  return receiver;
};

const update = async (id, data) => {
  const receiver = await Receiver.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!receiver) {
    const error = new Error('Receiver not found');
    error.statusCode = 404;
    throw error;
  }
  return receiver;
};

const remove = async (id) => {
  const receiver = await Receiver.findByIdAndDelete(id);
  if (!receiver) {
    const error = new Error('Receiver not found');
    error.statusCode = 404;
    throw error;
  }
  return receiver;
};

module.exports = { create, findAll, findById, update, remove };