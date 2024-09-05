const jwt = require('jsonwebtoken');

async function generateToken(email, userId, secret) {
  return jwt.sign({ email, userId }, secret);
}

module.exports = {
  generateToken,
};
