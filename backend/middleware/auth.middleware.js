const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/User');
const { sendError } = require('../utils/responseHandler');
const MESSAGES = require('../constants/messages');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, MESSAGES.TOKEN_MISSING, 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return sendError(res, MESSAGES.UNAUTHORIZED, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return sendError(res, MESSAGES.TOKEN_INVALID, 401);
    }
    next(error);
  }
};

module.exports = authenticate;
