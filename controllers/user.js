const Services = require('../services');

exports.getUserById = async (req, res) => {
  try {
    // handling get user service
    const user = await Services.getUserService(req.params);

    // Returning the response
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    // handling update user service
    const responseMessage = await Services.updateUserService(
      req.body,
      req.params
    );

    // Returning the response
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // handling update password service
    const responseMessage = await Services.changePasswordService(
      req.body,
      req.params
    );

    // Returning the response
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    next(error);
  }
};
