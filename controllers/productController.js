const Product = require('../models/productModel');

const STATUS_201 = 201;

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await Product.createProduct(name, quantity);
    return res.status(STATUS_201).json(result);
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  createProduct,
};
