const productService = require('../services/productService');
const HTTP201 = 201;
const HTTP500 = 500;
const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createProduct(name, quantity);
        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};


module.exports = {
  createProduct,
};