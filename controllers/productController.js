const Product = require('../models/productModel');
const { UnprocessableException } = require('../utils/errorHandler');

const SUCCESS = 200;
const CREATED = 201;

const getAllProductsController = async (_req, res, next) => {
  try {
	  const products = await Product.getAll();
    const result = { products };
    return res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

const getProductByIdController = async (req, res, next) => {
  const wrongIdFormatErrorMessage = 'Wrong id format';
  try {
    const { id } = req.params;
    const result = await Product.getById(id);
    if (result !== null) res.status(SUCCESS).json(result);
    throw new UnprocessableException(
      wrongIdFormatErrorMessage
    );
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
  getProductByIdController,
  createProductController
};
