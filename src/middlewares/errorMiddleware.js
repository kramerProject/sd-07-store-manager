const errorMiddleware = (err, req, res, next) => {
  console.log('Console middleware de erro do app -> ', err);
  return res
    .status(err.status)
    .send({
      message: err.message,
    });
};

module.exports = errorMiddleware;