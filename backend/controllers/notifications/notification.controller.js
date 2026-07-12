const notificationService = require('../../services/notification.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const { userId, title, message } = req.body;
    const notification = await notificationService.create(userId, title, message);
    sendSuccess(res, { notification }, 'Notification created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await notificationService.findByUser(req.user._id, req.query);
    sendSuccess(res, { notifications: result.notifications, pagination: result.pagination }, 'Notifications fetched successfully');
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user._id);
    sendSuccess(res, { notification }, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await notificationService.remove(req.params.id, req.user._id);
    sendSuccess(res, {}, 'Notification deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, markAsRead, remove };
