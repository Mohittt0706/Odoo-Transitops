const dashboardService = require('../../services/dashboard.service');
const { sendSuccess } = require('../../utils/responseHandler');

const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getDashboard(req.user.role);
    sendSuccess(res, dashboard, 'Dashboard fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
