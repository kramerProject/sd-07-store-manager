
const { addProduct } = require('../Models/addProduct');
const {getProductByName} = require('../Models/getProductByName');

const serviceAddProduct = async (name, quantity) => {
  return addProduct(name, quantity);
};

const serviceGetProductByName = async (name) => {
  return getProductByName(name);
};

module.exports = {
  serviceAddProduct,
  serviceGetProductByName,
};