const Auth = require('../../models/Auth');
const User = require('../../models/User');
const Error = require('../../utils/errorHandler');
const Validator = require('../../utils/validations');
const Helpers = require('../../utils/helpers');

/**
 * Method to create a documents in
 * Auth and User collection
 * @param {*} params = email, password, firstName, lastName, phoneNumber
 */
async function registerUserService(params) {
  try {
    const { email, password, firstName, lastName, phoneNumber } = params;

    // Validating email address
    const isValidEmail = Validator.validateEmail(email);
    if (!isValidEmail) {
      Error.clientError('Invalid Email Address!');
    }

    // Validating password
    const isValidPassword = Validator.validatePassword(password);
    if (!isValidPassword) {
      Error.clientError(
        'Invalid Password. Required minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      );
    }

    // Checking whether the email is already exists in DB or not
    const alreadyExists = await Auth.exists({ email: email.toLowerCase() });
    if (alreadyExists) {
      Error.conflict('Email Already Exist');
    }

    // Encoding password
    const encodedPassword = await Helpers.generatePasswordHash(password);

    // Creating entry in Auth Collection
    const auth = new Auth({
      email: email.toLowerCase(),
      password: encodedPassword,
    });

    // Creating entry in User Collection
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      auth,
    });

    // Adding user ID in Auth Collection
    auth.user = user._id;

    await auth.save();
    await user.save();

    return 'User registered successfully';
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUserService };
