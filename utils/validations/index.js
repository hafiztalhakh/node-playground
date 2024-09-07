const { EMAIL_REGEX, PASSWORD_REGEX } = require('../constants');

async function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

async function validatePassword(password) {
  return PASSWORD_REGEX.test(password);
}

module.exports = {
  validateEmail,
  validatePassword,
};
