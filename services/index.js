module.exports = {
  // Authentication Services
  ...require('./auth/registerUser.service'),
  ...require('./auth/login.service'),
  ...require('./auth/recoverPassword.service'),
  ...require('./auth/verifyPasswordRecoveryCode.service'),
  ...require('./auth/resetPassword.service'),

  // User realted Services
  ...require('./user/getUser.service'),
  ...require('./user/updateUser.service'),
  ...require('./user/changePassword.service'),

  // Email shooter service
  ...require('./email/generateEmail.service'),
};
