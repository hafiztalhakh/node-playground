module.exports = {
  ...require('./auth/registerUser.service'),
  ...require('./auth/login.service'),
  ...require('./auth/recoverPassword.service'),
  ...require('./auth/generatePasswordHash.service'),
  ...require('./email/generateEmail.service'),
};
