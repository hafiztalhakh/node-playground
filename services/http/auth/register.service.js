const Auth = require('../../../models/Auth');
const User = require('../../../models/User');

const { validateEmail, userExists } = require('../../../utils/validations');
const {
  badRequestError,
  conflictedRequestError,
} = require('../../../utils/helpers/errors');

async function registerUserService(data) {
  try {
    const { firstName, lastName, email: _email, password, phoneNumber } = data;

    // Validating email address
    const email = await validateEmail(_email);
    if (!email) {
      badRequestError('Invalid email address');
    }

    // Checking whether the email is already exists in DB or not
    if (await userExists(email)) {
      conflictedRequestError('Email Already Exist');
    }

    if (!password) {
      badRequestError('Password is required');
    }

    if (password?.length < 6) {
      badRequestError('Password should be atleast 6 characters long');
    }

    // Generating hash for password to keep it secret
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating entry in Auth Collection
    const auth = new Auth({ email: _email, password: hashedPassword });

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

    // Returning the response
    res.status(201).json({ message: 'Registered Successfully' });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = registerUserService;
