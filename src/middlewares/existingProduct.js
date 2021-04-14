const Product = require('../models/productsModel');

const existingProduct = async (req, res, next) => {
  const { name } = req.body;
  const products = await Product.findAll();

  if (products.some((product) => product.name ===  name)) {
    const code = 422;
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });
  }
  next();
};

module.exports = existingProduct;
