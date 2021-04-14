const model = require('../models/product');
const { throwError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const createProduct = async ({ name, quantity }) => {
  const product = await model.getByName(name);

  if (product) {
    throw new throwError(status.unprocessableEntity, errors.productExists);
  }

  const createdProduct = await model.createProduct(name, quantity);

  const result = {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };

  return result;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();

  const allProducts = {
    products,
  };

  return allProducts;
};

const getProductById = async (id) => {
  const product = await model.getProductById(id);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  await model.updateProduct(id, name, quantity);

  const updatedProduct = {
    _id: id,
    name,
    quantity,
  };

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await model.deleteProduct(id);

  return deletedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};