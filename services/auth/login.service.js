const bcrypt = require('bcryptjs');

const Auth = require('../../models/Auth');
const Error = require('../../utils/errorHandler');
const Helpers = require('../../utils/helpers');

async function loginService(params) {
  try {
    const { email, password } = params;

    // Finding the auth document by email
    const auth = await Auth.findOne({ email: email.toLowerCase() });

    if (!auth) {
      Error.unauthorized('Incorrect email or password');
    }

    // Comparing the passwords
    const isEqual = await bcrypt.compare(password, auth.password);
    if (!isEqual) {
      Error.clientError('Incorrect Password');
    }

    // Generating new JWT TOKEN for the authenticated user
    const token = await Helpers.generateToken(
      auth?.email,
      auth?.user,
      process.env.JWT_SECRET
    );

    return { token, message: 'Success' };
  } catch (error) {
    throw error;
  }
}

module.exports = { loginService };
