const bcrypt = require('bcryptjs');

const Auth = require('../../models/Auth');

const { EMAIL_REGEX } = require('../constants');

exports.validateEmail = (email) => {
  if (EMAIL_REGEX.test(email)) return email.toLowerCase();
  else return false;
};

exports.userExists = (email) => Auth.exists({ email: email.toLowerCase() });

exports.comparePassword = async (password, confirm_password) =>
  password === confirm_password;

exports.verifyPassword = async (password_to_comapre, password_base) =>
  await bcrypt.compare(password_to_comapre, password_base);
