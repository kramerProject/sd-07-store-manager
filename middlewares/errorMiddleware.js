const { INTERNAL } = require('../CODE_ERROR');

async function errorMiddleware (err, _req, res, _next) {
  if (err.status ) {
    return res.status(err.status).send({err: err.err});
  } else {
    return res.status(INTERNAL).send({ err: err.message });
  }
}

module.exports = { errorMiddleware };
