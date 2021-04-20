const ProductService = require('../services/productService');
// const rescue = require('express-rescue');

const SUCCSESS = 200;
const NOT_FOUND = 404;
const ERRO = 500;
const UNPROCESSABLE_ENTITY = 422;

const getProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const ERROR = 500;
  try {
    const product = await ProductService.createProduct(name, quantity);
    res.status(product.status).json(product.msg);
  } catch (err) {
    console.error(err.message);
    res.status(ERROR).json(err.message);
  }
};

const getAll = async (req, res) => {
  const products = await ProductService.getAll();

  res.status(SUCCSESS).json({ products: products });
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getProductById(id);

    if (product.msg) {
      return res.status(product.status).json(product.msg);
    }
    res.status(SUCCSESS).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(UNPROCESSABLE_ENTITY).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductService.updateProduct(id, name, quantity);
    // console.log(product);
    if (product) {
      return res.status(product.status).json(product.msg);
    }
    res.status(SUCCSESS).json(product);

  } catch (err) {
    console.error(err.message);
    res.status(UNPROCESSABLE_ENTITY).json(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.deleteProduct(id);
    //res.status(SUCCSESS).json(product);
    // return res.status(product.status).json(product.msg);
    if (product) {
      return res.status(product.status).json(product.msg);
    }
    res.status(SUCCSESS).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(UNPROCESSABLE_ENTITY).json(error.message);
  }
};

module.exports = {
  getProducts,
  getAll,
  getProductById,
  updateProduct,
  deleteProduct
};
