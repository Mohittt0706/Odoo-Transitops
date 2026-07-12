const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { ROLES } = require('../constants/roles');
const {
  overview,
  fleet,
  trips,
  drivers,
  finance,
  maintenance,
  exportCSV,
  exportPDF,
} = require('../controllers/reports/report.controller');

router.use(authenticate);

router.get('/overview', authorize(ROLES.OPERATION_LEAD), overview);
router.get('/fleet', authorize(ROLES.OPERATION_LEAD), fleet);
router.get('/trips', authorize(ROLES.OPERATION_LEAD, ROLES.ROAD_CAPTAIN), trips);
router.get('/drivers', authorize(ROLES.OPERATION_LEAD, ROLES.SAFETY_OFFICER), drivers);
router.get('/finance', authorize(ROLES.OPERATION_LEAD, ROLES.FINANCE_HUB), finance);
router.get('/maintenance', authorize(ROLES.OPERATION_LEAD), maintenance);
router.get('/export/csv', authorize(ROLES.OPERATION_LEAD), exportCSV);
router.get('/export/pdf', authorize(ROLES.OPERATION_LEAD), exportPDF);

module.exports = router;