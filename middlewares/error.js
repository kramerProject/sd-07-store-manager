const CODES = require('../configurations/statusCodes');

module.exports = (err, req, res, _next) => {
  console.error('error.js', err);

  if (err.status) {
    return res.status(err.status).json({
      err: {
        code: err.err.code,
        message: err.err.message,
      },
    });
  }

  res
    .status(CODES.INTERNAL_SERVER_ERROR)
    .json({ err: { code: 'internal', message: 'Internal server error' } });
};
