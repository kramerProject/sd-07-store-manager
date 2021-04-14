const errorMiddleware = (err, _req, res, _next) => {
  res.status(500);
  const { statusCode } = err;
  if (statusCode) res.status(statusCode);
  res.json({ err });
};

module.exports = errorMiddleware;