const Auth = require('../../models/Auth');
const Validator = require('../../utils/validations');
const Error = require('../../utils/errorHandler');
const Helpers = require('../../utils/helpers');

async function resetPasswordService(params) {
  try {
    const { password, confirmPassword, code, email } = params;

    // Validating email address
    const isValidEmail = Validator.validateEmail(email);
    if (!isValidEmail) {
      Error.clientError('Invalid Email Address!');
    }

    // comparing passwords
    if (password !== confirmPassword) {
      Error.clientError('Password does not match');
    }

    // Finding the auth document by email and valid resetToken
    const auth = await Auth.findOne({
      email: email.toLowerCase(),
      resetToken: code,
    });

    if (!auth) {
      Error.clientError('Invalid Recovery Code');
    }

    // encoding password and saving to the doc
    auth.password = await Helpers.generatePasswordHash(password);
    await auth.save();

    return 'Your password has been successfully changed';
  } catch (error) {
    throw error;
  }
}

module.exports = { resetPasswordService };
