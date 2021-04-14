const quantityValidationsMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  const UNPROCESSABLE = 422;
  try {
    const AMOUNT = 1;
    if (!Number.isInteger(quantity)) {
      return res
        .status(UNPROCESSABLE)
        .send({
          err: {
            code: 'invalid_data',
            message: '"quantity" must be a number',
          }
        });
    }
    if (quantity < AMOUNT) {
      return res
        .status(UNPROCESSABLE)
        .send({
          err: {
            code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1',
          }
        });
    }
    next();

  } catch (error) {
    next({
      err: {
        code: error.code,
        message: error.message,
      }
    });
  }
};

module.exports = quantityValidationsMiddleware;