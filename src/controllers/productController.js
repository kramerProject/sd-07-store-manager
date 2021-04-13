const products = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await products.addProduct(name, quantity);
    if (result.err) return res.status(422).json(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProduct,
};