const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Method to generate JWT Token
 * @param {*} email
 * @param {*} userId
 * @param {*} secret
 * @returns
 */
async function generateToken(email, userId, secret) {
  return jwt.sign({ email, userId }, secret);
}

/**
 * Method to generate hash/encode passwords
 * @param {*} password
 */
async function generatePasswordHash(password) {
  return await bcrypt.hash(password, 12);
}

/**
 * Method to generate random code
 * @returns number
 */
function generateCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
  generatePasswordHash,
  generateToken,
  generateCode,
};
