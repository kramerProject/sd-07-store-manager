const productModel = require('../models/productModel');
const rescue = require('express-rescue');

const OK = 200;

const getAllProducts = rescue(async (_req, res) => {
  try {
    const productsArray = await productModel.getAllProducts();
    res.status(OK).json(productsArray);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductById = rescue(async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.getProductById(id);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addNewProduct = rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productModel.addNewProduct(name, quantity);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = rescue(async (req, res) => {
  try {
    const { id, name, quantity } = req.body;
    const product = await productModel.updateProduct(id, name, quantity);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = rescue(async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.deleteProduct(id);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
