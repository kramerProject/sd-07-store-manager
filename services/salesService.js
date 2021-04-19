const saleModel = require('../models/saleModel');
const {invalidIdOrQuantity} = require('./salesValidation');

const message = require('./errorMessages');

const addSale = async (product) => {
  if(invalidIdOrQuantity(product)) 
  return {
    response: message.invalidIdOrQuantity,
    status: 422,
  } ;
  const result = await saleModel.createSale(product);
  return {
    response: result,
    status: 200,
  };
};

const getAll = async () => {
  const result = await saleModel.getAll();
  return {sales: {'sales': result}, 'status': 200};
};

const getById = async (id) => {
  if(result._id) return {status:200, response: result};
  const result = await saleModel.getById(id);
  return {status: 404, response: {
    'err': {'code': 'not_found', 'message': 'Sale not found'}
  }};
};

const updateSale = async (id, product) => {
  if(invalidIdOrQuantity(product)) 
  return {
    response: message.invalidIdOrQuantity,
    status: 422,
  } ;
  const result = await saleModel.updateSale(id, product);
  return {
    response: result,
    status: 200,
  };
};

const deleteSale = async (id) => {
  const result = await saleModel.deleteSale(id);
  if(result) return {status: 200, response: result};
  return {status: 422, response: {
    'err': {'code': 'invalid_data', 'message': 'Wrong sale ID format'}
  }};
};

module.exports = {
  addSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};
