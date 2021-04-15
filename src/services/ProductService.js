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
  console.log(productExist);
  if (productExist) {
    throw new Error(errorMessage.productAlreadyExists);
  }
};

const getAllProducts = async () => {};

const getProductById = async (id) => {};

const createProduct = async (name, quantity) => {
  validatorNameAndQuanity(name, quantity);
  await getProductByName(name);

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