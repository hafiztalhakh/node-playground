const express = require('express');

const { registerUser, login } = require('../controllers/auth');

const router = express.Router();

router.post('register-user', registerUser);
router.post('/login', login);

module.exports = router;
