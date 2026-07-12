const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw Object.assign(new Error('Email already registered'), { statusCode: 409 });
  }
  const user = await User.create(data);
  const token = generateToken(user._id, user.role);
  return { token, user: user.toJSON() };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  if (!user.isActive) {
    throw Object.assign(new Error('Account is deactivated'), { statusCode: 403 });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: user.toJSON(),
  };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return user;
};

module.exports = { register, login, getProfile };
