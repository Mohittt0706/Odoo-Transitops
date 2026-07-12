const tripService = require('../../services/trip.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const trip = await tripService.create(req.body);
    sendSuccess(res, { trip }, 'Trip created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await tripService.getAll(req.query);
    sendSuccess(res, result, 'Trips fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const trip = await tripService.getById(req.params.id);
    sendSuccess(res, { trip }, 'Trip fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const trip = await tripService.update(req.params.id, req.body);
    sendSuccess(res, { trip }, 'Trip updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await tripService.remove(req.params.id);
    sendSuccess(res, {}, 'Trip deleted successfully');
  } catch (error) {
    next(error);
  }
};

const dispatch = async (req, res, next) => {
  try {
    const trip = await tripService.dispatch(req.params.id);
    sendSuccess(res, { trip }, 'Trip dispatched successfully');
  } catch (error) {
    next(error);
  }
};

const complete = async (req, res, next) => {
  try {
    const { actualDistance } = req.body;
    const trip = await tripService.complete(req.params.id, actualDistance);
    sendSuccess(res, { trip }, 'Trip completed successfully');
  } catch (error) {
    next(error);
  }
};

const cancel = async (req, res, next) => {
  try {
    const trip = await tripService.cancel(req.params.id);
    sendSuccess(res, { trip }, 'Trip cancelled successfully');
  } catch (error) {
    next(error);
  }
};

const confirmDelivery = async (req, res, next) => {
  try {
    const trip = await tripService.confirmDelivery(req.params.tripId, req.body);
    sendSuccess(res, { trip }, 'Delivery confirmed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  dispatch,
  complete,
  cancel,
  confirmDelivery,
};
