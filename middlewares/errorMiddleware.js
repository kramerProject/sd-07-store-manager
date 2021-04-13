const status = require('../services/status');
const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json({
      err: {
        code: err.code,
        message: err.message
      }});
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({

    error: 'Deu ruim...',
  });
};

module.exports = errorMiddleware;
