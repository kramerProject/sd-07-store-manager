const productService = require('../services/productService');

const quantityProductMiddleware = async (req, res, next) => {
  const ZERO = 0;
  const ONE = 1;
  const itensSold = req.body;

  for (index = ZERO; index < itensSold.length; index += ONE) {
    const product = await productService.findById(itensSold[index].productId);

    if (product.quantity < itensSold[index].quantity) {
      return res.status('404').send({ err: { code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      } });
    }
    
    next();
  }
};

module.exports = quantityProductMiddleware;
