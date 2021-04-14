const { productService } = require('../services');
const status = require('../status');

const quantityValidationMiddleware = (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!productService.quantityIsInt(quantity))
      return res.status(status.INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        }
      });
    if (!productService.validQuantity(quantity))
      return res.status(status.INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        }
      });
    next();
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(err.message);
  }
  
};

module.exports = quantityValidationMiddleware;
