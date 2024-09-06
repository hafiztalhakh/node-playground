const express = require('express');

const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/register-user', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/recover-password', AuthController.recoverPassword);
router.post('/verify-otp', AuthController.verifyPasswordRecoveryCode);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
