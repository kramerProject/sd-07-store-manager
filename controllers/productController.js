const Product = require('../models/productModel');

const SUCCESS = 200;
const CREATED = 201;

const getAllProductsController = async (_req, res, next) => {
  try {
	  const products = await Product.getAll();
    return res.status(SUCCESS).json(products);
  } catch (err) {
    next(err);
  }
};

const createProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await Product.createProduct(name, quantity);
    return res.status(CREATED).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProductsController,
  createProductController
};
