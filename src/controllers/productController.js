const products = require('../services/productService');
const codes = require('../services/codes');
const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await products.addProduct(name, quantity);
    if (result.err) return res.status(codes.notProcessed).json(result);
    res.status(codes.update).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProduct,
};