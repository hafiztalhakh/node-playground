const jwt = require('jsonwebtoken');

exports.generateToken = async (email, userId, secret, scope) =>
  jwt.sign({ email, userId, scope }, secret);
