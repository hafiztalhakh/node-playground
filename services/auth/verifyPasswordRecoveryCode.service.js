const Auth = require('../../models/Auth');
const Validator = require('../../utils/validations');
const Error = require('../../utils/errorHandler');

async function verifyPasswordRecoveryCodeService(params) {
  try {
    const { code, email } = params;

    // Validating email address
    const isValidEmail = Validator.validateEmail(email);
    if (!isValidEmail) {
      Error.clientError('Invalid Email Address!');
    }

    const isValidCode = await Auth.findOne({
      email: email.toLowerCase(),
      resetToken: code,
    }).lean();

    if (!isValidCode) {
      Error.clientError('Invalid Recovery Code');
    }

    return 'Code verified successfully';
  } catch (error) {
    throw error;
  }
}

module.exports = { verifyPasswordRecoveryCodeService };
