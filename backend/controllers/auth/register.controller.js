const authService = require('../../services/auth.service');
const { sendSuccess } = require('../../utils/responseHandler');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    sendSuccess(res, { token: result.token, user: result.user }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
