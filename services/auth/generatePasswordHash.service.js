const bcrypt = require('bcryptjs');

/**
 * Method to generate hash (encode) passwords
 * @param {*} password
 */
async function generatePasswordHash(password) {
  return await bcrypt.hash(password, 12);
}

module.exports = { generatePasswordHash };
