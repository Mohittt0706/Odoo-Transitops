const receiverService = require('../../services/receiver.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const receiver = await receiverService.create(req.body);
    sendSuccess(res, { receiver }, 'Receiver created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await receiverService.findAll(req.query);
    sendSuccess(res, { receivers: result.receivers, pagination: result.pagination }, 'Receivers fetched successfully');
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const receiver = await receiverService.findById(req.params.id);
    sendSuccess(res, { receiver }, 'Receiver fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const receiver = await receiverService.update(req.params.id, req.body);
    sendSuccess(res, { receiver }, 'Receiver updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await receiverService.remove(req.params.id);
    sendSuccess(res, {}, 'Receiver deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll, findById, update, remove };