const unprocessableEntity = 422;
const minNumber = 0;
console.log();
const quantityMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number' || quantity === null) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= minNumber) {
    return res.status(unprocessableEntity).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

module.exports = quantityMiddleware;
