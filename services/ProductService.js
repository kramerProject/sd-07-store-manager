const productModel = require('../models/ProductModel');

const create = async (product) => { 
  const insertedId = await productModel.create(product);
  return { id: insertedId, ...product };
};

const getByName = async (name) => {
  const product = await productModel.findByName(name);
  return product;
};

const nameVerify = (name) => {
  const MIN_NAME_LENGTH = 5;
  if (name.length >= MIN_NAME_LENGTH) return true;
  return false;
};

const quantityVerify = (quantity) => {
  const MIN_QUANTITY = 1;
  if (quantity >= MIN_QUANTITY) return true;
  return false;
};

const productExists = async (name) => {
  const id = await productModel.findByName(name);
  if (id) return true;
  return false;
};

module.exports = {
  create,
  getByName,
  nameVerify,
  quantityVerify,
  productExists,
};
