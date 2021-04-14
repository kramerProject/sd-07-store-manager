const productModel = require('../models/productModel');

const salePostMiddleware = async (req, res, next) => {
  const ZERO = 0;
  const [sales] = req.body;
  const productId = await productModel.findById(sales.productId);

  if (sales.quantity <= ZERO || !sales.quantity
    || typeof sales.quantity === 'string' || !productId) {
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    } });
  }   

  next();
};

module.exports = salePostMiddleware;
