const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Auth = require('../models/Auth');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const _email = email.toLowerCase();

    // Checking whether the email is already exists in DB or not
    const alreadyExists = await Auth.exists({ email: _email });

    if (alreadyExists) {
      const error = new Error('Email Already Exist');
      error.statusCode = 400;
      throw error;
    }

    if (!password) {
      const error = new Error('Password is required');
      error.statusCode = 400;
      throw error;
    }

    if (password?.length < 6) {
      const error = new Error('Password should be atleast 6 characters long');
      error.statusCode = 400;
      throw error;
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

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // Finding the auth document by email
    const auth = await Auth.findOne({ email });

    if (!auth) {
      const error = new Error('Incorrect email address');
      error.statusCode = 401;
      throw error;
    }

    // Comparing the passwords
    const isEqual = await bcrypt.compare(password, auth.password);
    if (!isEqual) {
      const error = new Error('Invalid Password');
      error.statusCode = 401;
      throw error;
    }

    // Generating new JWT TOKEN for the authenticated user
    const token = jwt.sign(
      { email: auth.email, userId: auth.user },
      process.env.JWT_SECRET
    );

    // Returning the response
    return res.status(200).json({
      message: 'Success',
      token,
      userId: auth.user.toString(),
    });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};
