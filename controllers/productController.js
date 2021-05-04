const Product = require('../models/productModel');
const productService = require('../services/productService');

const SUCCESS = 200;
const CREATED = 201;
const INVALID_DATA = 422;
const INTERNAL_SERVER_ERROR = 500;

const getAllProducts = async (req, res) => {
  try {
    const results = await Product.getAllProducts();
  
    return res.status(SUCCESS).json(results);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const verifications = await productService.verifyEntries(name, quantity);
  try {
    if (verifications) {
      throw Error(verifications);
    }
    const newProduct = await Product.createProduct(name, quantity);
    return res.status(CREATED).json(newProduct);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};