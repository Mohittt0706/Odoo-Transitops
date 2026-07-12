const Receiver = require('../models/Receiver');

const create = async (data) => {
  const receiver = await Receiver.create(data);
  return receiver;
};

const findAll = async (query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [receivers, total] = await Promise.all([
    Receiver.find().skip(skip).limit(parseInt(limit)),
    Receiver.countDocuments(),
  ]);
  return {
    receivers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
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

module.exports = { create, findAll, findById };
