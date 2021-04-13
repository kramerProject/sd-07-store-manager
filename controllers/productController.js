const productService = require('../services/productService');

const CREATED = 201;
const UNPROCESSABLE = 422;

const createProduct = async (req, res) => {
  const product = req.body;

  try {
    const response = await productService.createProduct(product);

    res.status(CREATED).json(response);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

module.exports = {
  createProduct,
};
