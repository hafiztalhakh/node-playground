const bcrypt = require('bcryptjs');

async function generateHash(word, salt) {
  return await bcrypt.hash(word, salt);
}

module.exports = {
  generateHash,
};
