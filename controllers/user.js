const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Auth = require('../models/Auth');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate('auth', 'email -_id')
      .select('-status -createdAt -updatedAt')
      .lean();

    // Returning the response
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    if (firstName || lastName || phoneNumber) {
      await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        phoneNumber,
      });

      // Returning the response
      res.status(200).json({ message: 'Success' });
    } else {
      const error = new Error('Bad request');
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    // Validating password
    if (currentPassword === newPassword) {
      const error = new Error(
        'Your new password must not be same as your current password!'
      );
      error.statusCode = 406;
      throw error;
    }

    // Finding the auth document by user ID
    const auth = await Auth.findOne({ user: id });

    // Comparing the passwords
    const isEqual = await bcrypt.compare(currentPassword, auth.password);
    if (!isEqual) {
      const error = new Error('Incorrect Password');
      error.statusCode = 400;
      throw error;
    }

    // Validating password
    if (newPassword !== confirmPassword) {
      const error = new Error('Password does not match');
      error.statusCode = 400;
      throw error;
    }

    // Setting new password
    auth.password = await bcrypt.hash(newPassword, 12);
    await auth.save();

    // Returning the response
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);

    // Returning the response
    res
      .status(error?.statusCode || 500)
      .json({ message: error?.message, data: error?.data });
  }
};
