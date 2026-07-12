const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.routes');
const vehicleRoutes = require('./vehicle.routes');
const driverRoutes = require('./driver.routes');
const receiverRoutes = require('./receiver.routes');
const tripRoutes = require('./trip.routes');
const maintenanceRoutes = require('./maintenance.routes');
const fuelRoutes = require('./fuel.routes');
const expenseRoutes = require('./expense.routes');
const dashboardRoutes = require('./dashboard.routes');
const reportRoutes = require('./report.routes');
const notificationRoutes = require('./notification.routes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetPilot Backend Running',
  });
});

router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.use('/receivers', receiverRoutes);
router.use('/trips', tripRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/fuel', fuelRoutes);
router.use('/expenses', expenseRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
