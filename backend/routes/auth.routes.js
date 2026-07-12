const express = require('express');
const router = express.Router();

const register = require('../controllers/auth/register.controller');
const login = require('../controllers/auth/login.controller');
const getProfile = require('../controllers/auth/profile.controller');
const authenticate = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', authenticate, getProfile);

module.exports = router;
