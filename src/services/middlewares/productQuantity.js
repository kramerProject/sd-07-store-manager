const unprocessableEntity = 422;
const productQuantityMid = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  if (!Number.isInteger(quantity)) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (quantity <= zero) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

module.exports = productQuantityMid;
