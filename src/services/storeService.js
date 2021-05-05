const model = require('../models/storeModel');
const { invalidData, checkInfosProduct } = require('../helpers/invalidData');

const getAll = async () => {
  const products = await model.getAll();
  return { products };
};

const getById = async (id) => { 
  const product = await model.getById(id);

  if(!product) invalidData('Wrong id format');
  return product[0];
};

const newProduct = async (objct) => {
  const verifyName = await model.getByName(objct.name);
  if (verifyName) invalidData('Product already exists');
  checkInfosProduct(objct);

  const response = await model.newProduct(objct);
  return response;
};

const updateProduct = async (id, objct) => {
  checkInfosProduct(objct);

  const response = await model.updateProduct(id, objct);
  return response;
};

const deleteProduct = async (id) => {
  const product = await model.deleteProduct(id);

  if(!product) invalidData('Wrong id format');
  return product;
};

module.exports = {
  newProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct
};
