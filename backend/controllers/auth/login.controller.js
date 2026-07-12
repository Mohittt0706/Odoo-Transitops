const authService = require('../../services/auth.service');
const { sendSuccess } = require('../../utils/responseHandler');
const MESSAGES = require('../../constants/messages');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);

    sendSuccess(res, data, MESSAGES.LOGIN_SUCCESS);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
