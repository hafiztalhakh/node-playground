const Services = require('../services');

exports.registerUser = async (req, res, next) => {
  try {
    // handling user register service
    const reponseMessage = await Services.registerUserService(req.body);

    // Returning the response
    res.status(201).json({ message: reponseMessage });
  } catch (error) {
    // Returning error to next middleware
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // handling user register service
    const response = await Services.loginService(req.body);

    // Returning the response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.recoverPassword = async (req, res, next) => {
  try {
    // handling user recover password service
    const responseMessage = await Services.recoverPasswordService(req.body);

    // Returning the response
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    next(error);
  }
};
