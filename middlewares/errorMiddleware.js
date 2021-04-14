const status = require('../config/status');
const errorMiddleware = (err, _req, res, _next) => {
  console.log(err.origin, err.message);
  if (err.status) {
    return res.status(err.status).json({
      err: {
        code: err.code,
        message: err.message
      }});
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({
    error: 'Aí cabou...',
  });
};

module.exports = errorMiddleware;
