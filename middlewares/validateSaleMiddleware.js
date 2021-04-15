const { UNPROCESSABLE_ENTITY } = require('../helpers/status');

const validateSaleMiddleware = (req, res, next) => {
  const sales = req.body;

  sales.forEach((sale) => {
    const { quantity } = sale;

    if (quantity < 1 || typeof (quantity) !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: { 
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity' 
        },
      });
    }
  });

  next();
};

module.exports = validateSaleMiddleware;
