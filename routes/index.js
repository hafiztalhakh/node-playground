const express = require('express');
const cors = require('cors');

const auth = require('./auth');
const user = require('./user');

// Auth
const isAuth = require('../middlewares/isAuth');

function routes(app) {
  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', auth);
  app.use('/api/user', isAuth, user);
}

module.exports = routes;
