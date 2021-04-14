const codeStatus = {
  404: 'not_found',
  422: 'invalid_data',
  500: 'internal_server_error',
  405: 'stock_problem',
};

const sendError = (err, message, res) => {
  const code = codeStatus[err];

  res.status(err).json({
    err: { code, message },
  });
};

module.exports = {
  sendError,
};