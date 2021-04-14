const productsModel = require('../models/productsModel');

const { ObjectId } = require('mongodb');

const verifyName = (allProducts, name) => {
  const minLength = 5;
  const bool = allProducts.some((element) => element.name === name);
  if (typeof name !== 'string' || name.length <= minLength) {
    throw new Error('"name" length must be at least 5 characters long');
  } else if (bool) {
    throw new Error('Product already exists');
  }
};

const verifyQuantity = (quantity) => {
  const minSize = 0;
  if (!Number.isInteger(quantity) || quantity <= minSize) {
    throw new Error('"quantity" must be larger then or equal to 1');
  } else if (typeof quantity !== 'number') {
    throw new Error('"quantity" must be a number');
  }
};

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAll();
  try {
    verifyName(allProducts, name);
    verifyQuantity(quantity);

    const newProduct = await productsModel.create(name, quantity);
    return newProduct;
  } catch (error) {
    return error.message;
  }
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();
  return allProducts;
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return 'Wrong id format';
  } else {
    const product = await productsModel.getById(id);
    return product;
  }
};

module.exports = { createProduct, getAllProducts, getProductsById };
