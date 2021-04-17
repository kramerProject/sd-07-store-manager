const Product = require('../models/productModel');
const { productDataValidation } = require('../services/productDataValidation');
const { productIdValidation } = require('../services/productIdValidation');

const SUCCESS = 200;
const NOT_FOUND = 404;
const CREATED = 201;

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    return res.status(SUCCESS).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await productIdValidation(id);

    const result = await Product.getProductById(id);

    res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const reqProduct = req.body;

  try {
    await productDataValidation(reqProduct);

    const result = await Product.createProduct(name, quantity);

    res.status(CREATED).json(result);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const reqProduct = req.body;
  const { id } = req.params;

  try {
    await productIdValidation(id);
    await productDataValidation(reqProduct);

    const result = await Product.updateProduct({ id, name, quantity });
    if (!result) {
      res.status(NOT_FOUND).json({ message: 'Produto não encontrada' });
      return;
    }

    res.status(SUCCESS).json({ id, name, quantity });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productIdValidation(id);

    const result = await Product.deleteProduct(id);

    res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
