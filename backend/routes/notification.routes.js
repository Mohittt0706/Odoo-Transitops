const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { ROLES } = require('../constants/roles');
const { create, getAll, markAsRead, remove } = require('../controllers/notifications/notification.controller');

router.use(authenticate);

router.post('/', authorize(ROLES.OPERATION_LEAD), create);
router.get('/', getAll);
router.patch('/:id/read', markAsRead);
router.delete('/:id', remove);

module.exports = router;
