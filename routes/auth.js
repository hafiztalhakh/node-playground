const express = require('express');

const {
  registerUser,
  login,
  recoverPassword,
  verifyRecoverCode,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/login', login);
router.post('/recover-password', recoverPassword);
router.post('/verify-otp', verifyRecoverCode);
router.post('/reset-password', resetPassword);

module.exports = router;
