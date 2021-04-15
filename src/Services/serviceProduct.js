
const { addProduct } = require('../Models/addProduct');
const {getProductByName} = require('../Models/getProductByName');
const {getProductById} = require('../Models/getProductById');
const {getAllProduct} = require('../Models/getAllProducts');

const serviceAddProduct = async (name, quantity) => {
  return addProduct(name, quantity);
};

const serviceGetProductByName = async (name) => {
  return getProductByName(name);
};

const serviceGetAllProduct = async () => {
  return getAllProduct();
};

const serviceGetProdutById = async (id) => {
  return getProductById(id);
};

module.exports = {
  serviceAddProduct,
  serviceGetProductByName,
  serviceGetAllProduct,
  serviceGetProdutById,
};