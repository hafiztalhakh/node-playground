const express = require('express');

const {
  getUserById,
  updateUser,
  updatePassword,
} = require('../controllers/user');

const router = express.Router();

router.get('/:id', getUserById);
router.post('/:id', updateUser);
router.post('/update-password/:id', updatePassword);

module.exports = router;
