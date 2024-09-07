const Helpers = require('../utils/helpers');
const Error = require('../utils/errorHandler');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      Error.unauthorized('Not Authenticated');
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken = '';
    try {
      decodedToken = Helpers.verifyToken(token);
    } catch (err) {
      Error.fail();
    }

    if (!decodedToken) {
      Error.unauthorized('Not Authenticated');
    }

    // if token is valid then attaching userid to the request
    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    return res.status(err.statucCode || 405).json({
      message: err?.message || 'Invalid auth token',
    });
  }
};
