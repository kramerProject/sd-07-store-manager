const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const productModel = require('./productModel');

const add = async (name, quantity) => {
  const existProduct = await productModel.findByName(name);
  if(existProduct) {
    return null;
  } 
  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

const findById = async (id) => {
  const foundProduct = await productModel.findById(id);
  return foundProduct;
};

const findAll = async () => {
  const allProducts = await productModel.findAll();
  return { products: allProducts };
};

const update = async (id, name, quantity) => {
  const updatedProduct = await productModel.update(id, name, quantity);
  return updatedProduct;
};

const del = async (id) => {
  const foundProduct = await productModel.findById(id);

  if (foundProduct) {
    await productModel.del(id);
    return foundProduct;
  }
  
  return null;
};

module.exports = {
  add,
  findById,
  findAll,
  update,
  del,
};