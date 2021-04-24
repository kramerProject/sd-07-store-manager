const errorMiddleware = (err, _req, res, _next) => {
  const InternalServerError = 500;
  const { status, message, code } = err;

  if (status && code) {
    return res.status(status).json({
      err: {
        code,
        message,
      },
    });
  }else if (status) {
    return res.status(status).json({
      err: {
        message,
      }
    });
  }

  return res.status(InternalServerError).json({
    err: {
      message,
    },
  });
};

module.exports = errorMiddleware;
