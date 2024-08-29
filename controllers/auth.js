const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/User');
const Auth = require('../models/Auth');

const smtpConfiq = {
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const emailRegex = /\S+@\S+\.\S+/;

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

exports.login = async (req, res, next) => {
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
      const error = new Error('Incorrect Password');
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

exports.recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validating email address
    if (!emailRegex.test(email)) {
      const error = new Error('Invalid Email Address');
      error.statusCode = 400;
      throw error;
    }

    const user = await Auth.findOne({ email: email.toLowerCase() });
    if (!user) {
      const error = new Error('Incorrect email');
      error.statusCode = 400;
      throw error;
    }

    const passwordResetCode = Math.floor(1000 + Math.random() * 9000);
    user.resetToken = passwordResetCode;
    await user.save();

    const transporter = nodemailer.createTransport(smtpConfiq);
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Password reset Email',
      text: '',
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
    \n\n Your verification code is ${passwordResetCode}:\n\n
    \n\n If you did not request this, please ignore this email and your password will remain unchanged.
    </p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: 'Reset Code Has Been Emailed To Your Registered Email Address',
    });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};

exports.verifyRecoverCode = async (req, res, next) => {
  try {
    const { code, email } = req.body;

    // Validating email address
    if (!emailRegex.test(email)) {
      const error = new Error('Invalid Email Address');
      error.statusCode = 400;
      throw error;
    }

    const isValidCode = await Auth.findOne({
      email: email.toLowerCase(),
      resetToken: code,
    }).lean();

    if (!isValidCode) {
      const error = new Error('Invalid Recovery Code');
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword, code, email } = req.body;

    // Validating email address
    if (!emailRegex.test(email)) {
      const error = new Error('Invalid Email Address');
      error.statusCode = 400;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error('Password does not match');
      error.statusCode = 400;
      throw error;
    }

    const auth = await Auth.findOne({
      email: email.toLowerCase(),
      resetToken: code,
    });

    if (!auth) {
      const error = new Error('Invalid Recovery Code');
      error.statusCode = 400;
      throw error;
    }

    auth.password = await bcrypt.hash(password, 12);
    await auth.save();

    return res.status(201).json({
      message: 'Your Password Has Been Updated',
    });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};
