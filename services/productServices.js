const {
  createProduct,
  getProductByName,
  getAllProducts, 
  getProductById,
  updateById,
} = require('../models/productModel');
const { ObjectId } = require('mongodb');

const createProductValidation = (name, quantity) => {
  const minNameLength = 5;
  const minProductQnt = 1;
  if (name.length < minNameLength) {
    throw new Error('\"name\" length must be at least 5 characters long');
  }
  if (quantity < minProductQnt) {
    throw new Error('"\quantity\" must be larger than or equal to 1');
  }
  if (typeof quantity !== 'number') {
    throw new Error('\"quantity\" must be a number');
  }
};

const ifProductExist = async (name) => {
  const product = await getProductByName(name);
  if (product !== null) {
    throw new Error ('Product already exists');
  }
};

const insertProduct = async (name, quantity) => {

  await ifProductExist(name);
  createProductValidation(name, quantity);

  const product = await createProduct(name, quantity);
  return product;
};

const getProducts = async () => {
  const listOfProducts = await getAllProducts();
  return listOfProducts;
};

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return true;
  }
  return false;
};

const findProductById = async (id) => {
  const isValid = validateId(id);

  if (isValid) {
    throw new Error('Wrong id format');
  }
  const product = await getProductById(id);
  return product;
};

const updateProductById = async (id, name, quantity) => {
  createProductValidation(name, quantity);
  validateId(id);

  const updateProduct = await updateById(id, name, quantity);
  return updateProduct;
};

module.exports = {
  insertProduct,
  getProducts,
  findProductById,
  updateProductById
};