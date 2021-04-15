const { addProduct } = require('../Models/addProduct');
const { getProductByName } = require('../Models/getProductByName');
const { getProductById } = require('../Models/getProductById');
const { getAllProduct } = require('../Models/getAllProducts');
const { updateProduct } = require('../Models/updateProduct');

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

const serviceUpdateProduct = async (id, name, quantity) => {
  return updateProduct(id, name, quantity);
};

module.exports = {
  serviceAddProduct,
  serviceGetProductByName,
  serviceGetAllProduct,
  serviceGetProdutById,
  serviceUpdateProduct,
};
