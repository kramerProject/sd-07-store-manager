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
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || SERVER_ERROR;

  res.status(status).json({ err });
};
