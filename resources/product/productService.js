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


module.exports = {
  add,
  findById,
  findAll,
};