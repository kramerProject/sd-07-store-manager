const codeStatus = {
  404: 'not_found',
  422: 'invalid_data',
  500: 'internal_server_error',
  405: 'stock_problem',
};

class throwError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const sendError = (err, res) => {
  const { statusCode, message } = err;

  let code = codeStatus[statusCode];

  res.status(statusCode).json({
    err: { code, message },
  });
};

module.exports = {
  throwError,
  sendError,
};