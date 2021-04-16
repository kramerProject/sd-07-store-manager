module.exports = (err, _req, res, _next) => {
  const ERR = 422;
  const SERVER_ERROR = 500;
  if (err.isJoi) {
    return res.status(ERR).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message,
      },
    });
  }

  const statusByErrorCode = {
    invalid_data: 422,
    not_found: 404,
  };

  const status = statusByErrorCode[err.code] || not_found;

  res.status(status).json({ err });
};
