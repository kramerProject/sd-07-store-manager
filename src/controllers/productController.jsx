const validate = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await validate.productValidation(name, quantity);
    res.status(result.code).json(result.response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
};
