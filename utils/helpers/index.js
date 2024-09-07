const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Method to generate hash/encode passwords
 * @param {*} password
 */
async function generatePasswordHash(password) {
  return await bcrypt.hash(password, 12);
}

async function verifyPassword(password, hash) {
  await bcrypt.compare(password, hash);
}

/**
 * Method to generate JWT Token
 * @param {*} email
 * @param {*} userId
 * @param {*} secret
 * @returns
 */
async function generateToken(email, userId) {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET);
}

async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
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
  verifyPassword,
  generateToken,
  verifyToken,
  generateCode,
};
