const express = require('express');

const { registerUser, login } = require('../controllers/auth');

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/login', login);
// router.post('/recover-password', AuthController.recoverPassword);
// router.post('/verify-otp', AuthController.verifyRecoverCode);
// router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
