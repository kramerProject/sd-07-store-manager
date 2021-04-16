const product = require('../models/productModel');

const createProduct = async (name, quantity) => {

  newProduct = await product.create(name, quantity);

  return newProduct;
};

const getAllProduct = async () => {

  const list = await product.getAll();
  
  return  {products: list};
};

const getOneProduct = async (id) => {

  const list = await product.getById(id);
  
  return  list;
};


module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct
};