const productModel = require('../models/products');

const createProduct = async ({ name, quantity }) => {
  
  const messageErrorNameExists = {
    'code':'invalid_data',
    'message': 'Product already exists'
  };

  const product = await productModel.getByName(name);

  const zero = 0;

  if (product.length > zero) {
    return messageErrorNameExists;
  } 
 
  const createdProduct = await productModel.postdata(name, quantity);
  
  return createdProduct.ops[0];
};

const getAllProducts = async () => {
  const products = await productModel.getAll();
  const allProducts = {
    products,
  };
  return allProducts;
};

const getProductsId = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  await productModel.editdata(id, name, quantity);
  const updatedProduct = {
    _id: id,
    name,
    quantity
  };
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deletedata(id);
  return deletedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsId,
  updateProduct,
  deleteProduct
};