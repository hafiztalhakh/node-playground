const Services = require('../services');

exports.registerUser = async (req, res, next) => {
  try {
    // handling register service
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
    // handling login service
    const response = await Services.loginService(req.body);

    // Returning the response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.recoverPassword = async (req, res, next) => {
  try {
    // handling recover password service
    const code = await Services.recoverPasswordService(req.body);

    // Shooting email to the registered email address
    await Services.generateEmailService(
      req.body.email,
      'Password reset email',
      `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
      \n\n Your verification code is ${code}:\n\n
      \n\n If you did not request this, please ignore this email and your password will remain unchanged.
      </p>`
    );

    // Returning the response
    res.status(200).json({
      message: 'Reset Code Has Been Emailed To Your Registered Email Address',
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPasswordRecoveryCode = async (req, res, next) => {
  try {
    // handling verify recover password code service
    const responseMessage = await Services.verifyPasswordRecoveryCodeService(
      req.body
    );

    // Returning the response
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // handling reset password service
    const responseMessage = await Services.resetPasswordService(req.body);

    // Returning the response
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    next(error);
  }
};
