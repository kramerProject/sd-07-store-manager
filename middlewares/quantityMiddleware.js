const { UNPROCESSABLE_ENTITY } = require('../helpers/status');

const quantityMiddleware = (req, res, next) => {
  const ONE = 1;
  const { quantity } = req.body;
  if (quantity < ONE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }
  if (typeof (quantity) !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    });
  }
  next();
};

module.exports = quantityMiddleware;