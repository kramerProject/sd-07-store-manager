const { INTERNAL } = require('../utils/statusCode.json');
const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  return;
};

module.exports = errorMiddleware;