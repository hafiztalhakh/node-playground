const Auth = require('../../models/Auth');
const Services = require('../');
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
    await user.save();

    // Shooting email to the registered email address
    await Services.generateEmailService(
      email,
      'Password reset email',
      `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
      \n\n Your verification code is ${passwordResetCode}:\n\n
      \n\n If you did not request this, please ignore this email and your password will remain unchanged.
      </p>`
    );

    return 'Reset Code Has Been Emailed To Your Registered Email Address';
  } catch (error) {
    throw error;
  }
}

module.exports = {
  recoverPasswordService,
};
