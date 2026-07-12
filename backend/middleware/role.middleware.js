const { sendError } = require('../utils/responseHandler');
const MESSAGES = require('../constants/messages');

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, MESSAGES.UNAUTHORIZED, 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, MESSAGES.FORBIDDEN, 403);
    }

    next();
  };
};

module.exports = authorize;
