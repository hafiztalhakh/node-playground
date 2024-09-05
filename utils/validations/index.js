const bcrypt = require('bcryptjs');

const { EMAIL_REGEX, PASSWORD_REGEX } = require('../constants');

async function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

async function validatePassword(password) {
  return PASSWORD_REGEX.test(password);
}

exports.comparePassword = async (password, confirm_password) =>
  password === confirm_password;

exports.verifyPassword = async (password_to_comapre, password_base) =>
  await bcrypt.compare(password_to_comapre, password_base);

module.exports = {
  validateEmail,
  validatePassword,
};
