const saleModel = require('../models/saleModel');
const {invalidIdOrQuantity} = require('./salesValidation');

const message = require('./errorMessages');

const addSale = async (product) => {
  const result = await saleModel.createSale(product);
  if(invalidIdOrQuantity(product)) 
    return {
      response: message.invalidIdOrQuantity,
      status: 422,
    } ;
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
  const result = await saleModel.getById(id);
  if(result._id) return {status:200, response: result};
  return {status: 404, response: {
    'err': {'code': 'not_found', 'message': 'Sale not found'}
  }};
};

const updateSale = async (product) => {
  const result = await saleModel.updateSale(product);
  if(invalidIdOrQuantity(product)) 
    return {
      response: message.invalidIdOrQuantity,
      status: 422,
    } ;
  return {
    response: result,
    status: 200,
  };
};

module.exports = {
  addSale,
  getAll,
  getById,
  updateSale
};
