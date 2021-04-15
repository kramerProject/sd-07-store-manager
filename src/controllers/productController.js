const productModel = require('../models/productModel');
const rescue = require('express-rescue');
const ObjectId = require('mongodb');

const OK = 200;
const CREATED = 201;
const INVALID_DATA = 422;
const validationLength = 0;

const productExistsValidation = async (name) => {
  const allProducts = await productModel.getAllProducts();
  return allProducts.some(product => product.name === name);
};

const idValidation = async (id) => {
  const allProducts = await productModel.getAllProducts();
  return allProducts.some(product => product._id === ObjectId(id));
};

const allreadyExistsError = {
  'err': {
    'code': 'invalid_data',
    'message': 'Product already exists'
  }
};

const invalidIdError = {
  'err': {
    'code': 'invalid_data',
    'message': 'Wrong id format'
  }
};

const getAllProducts = rescue(async (_req, res) => {
  try {
    const productsArray = await productModel.getAllProducts();
    res.status(OK).json({
      'products': productsArray
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductById = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);
    if (product === null) {
      return res.status(INVALID_DATA).json(invalidIdError);
    }
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addNewProduct = rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const productsByName = await productModel.getAllProcutsByName(name);
    if (productsByName.length > validationLength) {
      return res.status(INVALID_DATA).json(allreadyExistsError);
    }
    // if (productExistsValidation(name)) {
    //   return res.status(INVALID_DATA).json(allreadyExistsError);
    // }
    const product = await productModel.addNewProduct(name, quantity);
    res.status(CREATED).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productModel.updateProduct(id, name, quantity);
    res.status(OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);
    if (product === null || !ObjectId.isValid(id)) {
      return res.status(INVALID_DATA).json(invalidIdError);
    }
    await productModel.deleteProduct(id);
    res.status(OK).json({});
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
