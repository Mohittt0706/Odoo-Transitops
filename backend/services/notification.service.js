const Notification = require('../models/Notification');

const create = async (userId, title, message) => {
  const notification = await Notification.create({ userId, title, message });
  return notification;
};

const findByUser = async (userId, query = {}) => {
  const { page = 1, limit = 20, isRead } = query;
  const filter = { userId };
  if (isRead !== undefined) filter.isRead = isRead === 'true';
  const skip = (page - 1) * limit;
  const [notifications, total] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Notification.countDocuments(filter),
  ]);
  return {
    notifications,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  };
};

const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, userId });
  if (!notification) {
    throw Object.assign(new Error('Notification not found'), { statusCode: 404 });
  }
  notification.isRead = true;
  await notification.save();
  return notification;
};

const remove = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, userId });
  if (!notification) {
    throw Object.assign(new Error('Notification not found'), { statusCode: 404 });
  }
  await notification.deleteOne();
};

module.exports = { create, findByUser, markAsRead, remove };
