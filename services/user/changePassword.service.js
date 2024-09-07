const Auth = require('../../models/Auth');
const Validator = require('../../utils/validations');
const Helpers = require('../../utils/helpers');
const Error = require('../../utils/errorHandler');

/**
 * Method to handle change password logic
 * @param { currentPassword, newPassword, confirmPassword } params
 * @param {*} id
 */
async function changePasswordService(params, id) {
  try {
    const { currentPassword, newPassword, confirmPassword } = params;

    // Comparing new and current password
    if (currentPassword === newPassword) {
      Error.clientError(
        'Your new password must not be same as your current password!'
      );
    }

    // Confirm new password
    if (newPassword !== confirmPassword) {
      Error.clientError('Password does not match!');
    }

    // Validating new password
    const isValidPassword = Validator.validatePassword(newPassword);
    if (!isValidPassword) {
      Error.clientError(
        'Invalid Password. Required minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      );
    }

    // Finding the auth document by user ID
    const auth = await Auth.findOne({ user: id });

    // Comparing the passwords
    const isEqual = await Helpers.verifyPassword(
      currentPassword,
      auth.password
    );

    if (!isEqual) {
      Error.clientError('Incorrect password!');
    }

    // Setting new password
    auth.password = await Helpers.generatePasswordHash(newPassword);
    await auth.save();

    return 'Password changed!';
  } catch (error) {
    throw error;
  }
}

module.exports = { changePasswordService };
