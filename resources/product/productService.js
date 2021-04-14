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

module.exports = {
  add,
};