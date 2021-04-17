const UNPROCESSABLE = 422;

const errorMiddleware = (err, _req, res, _next) => {
  res.status(UNPROCESSABLE).json(JSON.parse(err.message));
};

module.exports = {
  errorMiddleware,
};
