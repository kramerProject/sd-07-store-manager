
const codeStatus = {
  404: 'not_found',
  422: 'invalid_data',
  500: 'internal_server_error',
  405: 'stock_problem',
};

class throwError extends Error {
  constructor(statusCode, message, stock) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.stock = stock;
  }
}

const sendError = (err, res) => {
  const { statusCode, message, stock = '' } = err;

  let code = codeStatus[statusCode];

  if (stock !== '') code = 'stock_problem';

  res.status(statusCode).json({
    err: {
      code,
      message,
    },
  });
};

module.exports = {
  throwError,
  sendError,
};