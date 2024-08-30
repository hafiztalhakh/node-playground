function badRequestError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
}

function conflictedRequestError(message) {
  const error = new Error(message);
  error.statusCode = 409;
  throw error;
}

module.exports = {
  badRequestError,
  conflictedRequestError,
};
