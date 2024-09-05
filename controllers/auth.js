const { registerUserService } = require('../services');
const { loginService } = require('../services/auth/login.service');

async function registerUser(req, res, next) {
  try {
    // handling user register service
    const reponseMessage = await registerUserService(req.body);

    // Returning the response
    res.status(201).json({ message: reponseMessage });
  } catch (error) {
    // Returning error to next middleware
    next(error);
  }
}

async function login(req, res, next) {
  try {
    // handling user register service
    const response = await loginService(req.body);

    // Returning the response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  login,
};
