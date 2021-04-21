const ERROR = 500;
const errorMiddlewares = (err, req, res, next) => {
  if (err) {
    res.status(ERROR).send({
      error: `Encontramos o erro ${err.message}`,
    });
  }
  next();
};

module.exports = errorMiddlewares;
