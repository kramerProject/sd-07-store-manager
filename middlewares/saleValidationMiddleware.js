const status =  require('../status');
const { productService } = require('../services');
const { quantityIsInt } = require('../services/productService');

const saleValidationMiddleware = async (req, res, next) => {
  try {
    const sale = req.body;
    const productsIds = sale.map(item => item.productId);
    const productsQuantity = sale.map(item => item.quantity);
    const invalidQuantityType = productsQuantity
      .some(item => productService.quantityIsInt(item) === false);
    const invalidQuantity = productsQuantity
      .some(item => productService.validQuantity(item) === false);

    const existsProducts = await productService.existsProductId(productsIds);

    if (!existsProducts ||
        invalidQuantityType ||
        invalidQuantity)
      return res.status(status.INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    next();
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = saleValidationMiddleware;
