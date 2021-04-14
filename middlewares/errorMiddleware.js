const SERVER_ERROR = 500;

const errorMiddleware = (err, _req, res, _next) => {
  return res.status(SERVER_ERROR).send({ message: err.message });
};

module.exports = { errorMiddleware };
