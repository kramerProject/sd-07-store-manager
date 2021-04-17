const productModel = require('../models/ProductModel');
const errorMessage = require('../../helpers/errorMessages');

const validatorNameAndQuanity = (name, quantity) => {
  const ONE = 1;
  const FIVE = 5;   
  
  if (name.length < FIVE) {      
    throw new Error(errorMessage.nameLengthLessThenFive);
  }
  if (typeof quantity !== 'number') {      
    throw new Error(errorMessage.quantityNotANumber);
  }
  if (quantity < ONE) {      
    throw new Error(errorMessage.quantityLessThenOne);
  }
};

const getProductByName = async (name) => {
  const productExist = await productModel.getProductByName(name);
  if (productExist) {
    throw new Error(errorMessage.productAlreadyExists);
  }
};

const validatorProductExists = (product) => {
  if(!product) {
    throw new Error(errorMessage.idNonExistent);
  }
};

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  return allProducts;
};

const getProductById = async (id) => {
  const productById = await productModel.getProductById(id);
  validatorProductExists(productById);
  return productById;
};

const createProduct = async (name, quantity) => {
  validatorNameAndQuanity(name, quantity);
  await getProductByName(name);

  const newProduct = await productModel.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  validatorNameAndQuanity(name, quantity);

  const updatedProduct = await productModel.updateProduct(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {    
  const deletedProduct = await productModel.deleteProduct(id);
  validatorProductExists(deletedProduct);
  return deletedProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
};