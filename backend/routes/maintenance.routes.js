const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  maintenanceQuerySchema,
} = require('../validators/maintenance.validator');
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require('../controllers/maintenance/maintenance.controller');
const { ROLES } = require('../constants/roles');

router.use(authenticate);

router.get('/', validate(maintenanceQuerySchema, 'query'), findAll);
router.get('/:id', findById);

router.post('/', authorize(ROLES.OPERATION_LEAD), validate(createMaintenanceSchema), create);
router.put('/:id', authorize(ROLES.OPERATION_LEAD), validate(updateMaintenanceSchema), update);
router.delete('/:id', authorize(ROLES.OPERATION_LEAD), remove);

module.exports = router;
