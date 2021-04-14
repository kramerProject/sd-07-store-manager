const validation = require('../services/productService');

const erro500 = 500;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await validation.productIsValid(name, quantity);
    res.status(result.code).json(result.response);
  } catch (error) {
    console.error(error);
    res.status(erro500).json({ message: 'Internal Server Error'});
  }
};

module.exports = {
  createProduct,
};
