const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/:id', UserController.getUserById);
router.post('/:id', UserController.updateUser);
router.post('/update-password/:id', UserController.updatePassword);

module.exports = router;
