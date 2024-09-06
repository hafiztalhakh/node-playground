const Auth = require('../../models/Auth');
const Services = require('../../services');
const Validator = require('../../utils/validations');
const Helpers = require('../../utils/helpers');

async function recoverPasswordService(params) {
  try {
    const { email } = params;

    // Validating email address
    const isValidEmail = Validator.validateEmail(email);
    if (!isValidEmail) {
      Error.clientError('Invalid Email Address!');
    }

    // Finding the auth document by email
    const auth = await Auth.findOne({ email: email.toLowerCase() });
    if (!auth) {
      Error.clientError('Incorrect email');
    }

    const passwordResetCode = Helpers.generateCode();
    auth.resetToken = passwordResetCode;

    // Saving recovery code in auth doc
    await auth.save();

    return passwordResetCode;
  } catch (error) {
    throw error;
  }
}

module.exports = { recoverPasswordService };
