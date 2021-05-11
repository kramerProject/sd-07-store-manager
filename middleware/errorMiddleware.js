const errorMiddleware = (err, _request, response, _next) => {
  return response.status(err.status).send({
    err: {
      message: err.message,
      code: err.code,
    },
  });
};

module.exports = errorMiddleware;
