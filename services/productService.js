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

const updateProduct = async (id, name, quantity) => {

  const objProduct = await product.getById(id);
  if(!objProduct) {
    return null;
  }

  const productUpdate = await product.update({id, name, quantity});

  return productUpdate;
};


module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct,
  updateProduct
};