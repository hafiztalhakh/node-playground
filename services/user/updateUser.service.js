const User = require('../../models/User');
const Error = require('../../utils/errorHandler');

/**
 * Method to update user doc
 * @param {*} data
 * @param {*} id
 */
async function updateUserService(data, id) {
  try {
    const { firstName, lastName, phoneNumber } = data;

    if (!id) {
      Error.clientError('Id is required!');
    }

    if (!firstName && !lastName && !phoneNumber) {
      Error.clientError();
    }

    await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phoneNumber,
    });

    return 'Updated!';
  } catch (error) {
    throw error;
  }
}

module.exports = { updateUserService };
