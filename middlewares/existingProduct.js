const { findProduct } = require('../models/productModel');

const UnprocessableEntry = 422;

const existingProduct = async (req, res, next) => {
  const { name } = req.body;
  const existingProduct = await findProduct(name);
  if (existingProduct) {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

module.exports = existingProduct;