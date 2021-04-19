const { INTERNAL } = require('../CODE_ERROR');

const errorMiddleware = (err, _req, res, _next) => {
  return res.status(INTERNAL).send({ message: err.message });
};

module.exports = { errorMiddleware };
