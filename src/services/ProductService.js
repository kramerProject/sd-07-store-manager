const productModel = require('../models/ProductModel');

const getAllProducts = async () => {};

const getProductById = async (id) => {};

const createProduct = async (name, quantity) => {
  const newProduct = await productModel.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {};

const deleteProduct = async (id) => {};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};