const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.routes');
const vehicleRoutes = require('./vehicle.routes');
const driverRoutes = require('./driver.routes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetPilot Backend Running',
  });
});

router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);

module.exports = router;
