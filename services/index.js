module.exports = {
  ...require('./auth/generatePasswordHash.service'),
  ...require('./auth/registerUser.service'),
};
