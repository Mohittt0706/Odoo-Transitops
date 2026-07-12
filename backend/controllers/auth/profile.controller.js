const authService = require('../../services/auth.service');
const { sendSuccess } = require('../../utils/responseHandler');
const MESSAGES = require('../../constants/messages');

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user._id);

    sendSuccess(res, { user }, MESSAGES.PROFILE_FETCHED);
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
