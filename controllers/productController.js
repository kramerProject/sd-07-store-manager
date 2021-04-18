const ProductService = require('../services/productService');

const getProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const ERROR = 500;
  try {
    const product = await ProductService.createProduct(name, quantity);
    res.status(product.status).json(product.msg);
  } catch (err) {
    console.error(err.message);
    res.status(ERROR).json(err.message);
  }
};

module.exports = {
  getProducts,
};
