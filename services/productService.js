const productModel = require('../models/productModel');
const {minChar, minQtd, isNumber, isDuplicated} = require('./productValidation');

const addProduct = async (name, quantity) => {
  if (await isDuplicated(name)) return await isDuplicated(name);
  if (minChar(name)) return minChar(name);
  if (isNumber(quantity)) return isNumber(quantity);
  if (minQtd(quantity)) return minQtd(quantity);
  const result = await productModel.createProduct(name, quantity);
  return {
    response: result[0], 
    code: 201
  };
};

const getAll = async () => {
  const result = await productModel.getAll();
  return {'products': result};
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  if(result._id) return {status: 200, response: result};
  return {status: 422, response: {
    'err': {'code': 'invalid_data', 'message': 'Wrong id format'}
  }};
};

module.exports = {
  addProduct,
  getAll,
  getById
};
