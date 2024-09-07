const User = require('../../models/User');
const Error = require('../../utils/errorHandler');

/**
 * Method to get authenticated user by id
 * @param {*} id
 */
async function getUserService(id) {
  try {
    if (!id) {
      Error.clientError();
    }

    const user = await User.findById(id)
      .populate('auth', 'email -_id')
      .select('-status -createdAt -updatedAt')
      .lean();

    if (!user) {
      Error.notFound('No account associated with this Id');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserService };
