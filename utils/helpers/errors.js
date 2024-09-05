function clientError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
}

function unauthorized(message) {
  const error = new Error(message);
  error.statusCode = 401;
  throw error;
}

function notFound(message) {
  const error = new Error(message);
  error.statusCode = 404;
  throw error;
}

function conflict(message) {
  const error = new Error(message);
  error.statusCode = 409;
  throw error;
}

function fail(message) {
  const error = new Error(message);
  error.statusCode = 500;
  throw error;
}

module.exports = {
  clientError,
  unauthorized,
  notFound,
  conflict,
  fail,
};
