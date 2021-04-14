const { INTERNAL } = require('../utils/statusCode.json');
const errorMiddleware = (err, _req, res, _next) => {
  res.status(INTERNAL);
  const { statusCode } = err;
  if (statusCode) return res.status(statusCode);
  return res.json({ err });
};

module.exports = errorMiddleware;