const { INTERNAL } = require('../CODE_ERROR');

async function errorMiddleware (err, _req, res, _next) {
  return res.status(INTERNAL).send({ message: err.message });
};

module.exports = { errorMiddleware };
