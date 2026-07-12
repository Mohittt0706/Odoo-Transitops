const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.routes');

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetPilot Backend Running',
  });
});

router.use('/auth', authRoutes);

module.exports = router;
