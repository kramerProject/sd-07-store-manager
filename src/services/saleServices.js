const saleModel = require('../models/saleModel');
const { ObjectId } = require('mongodb');

const statusHttp = {
  C_200: 200,
  C_201: 201,
  C_404: 404,
  C_422: 422,
  C_500: 500,
};

const ZERO = 0;

const quantityIsNumber = (sold) => {
  const { quantity } = sold;
  if (Number.isInteger(quantity))
    return true;
};

const validId = (sold) => {
  const { productId } = sold;
  if(!ObjectId.isValid(productId)) {
    return false;
  }
  return true;
};

const validIdBySale = (id) => {
  if(!ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

const create = async (sold) => {
  let result = undefined;
  sold.every(function (item) {
    if (!validId(item)
    || !quantityIsNumber(item)
    || item.quantity <= ZERO) {
      result = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity', }
      };
      return false;
    }
    return true;
  });
  if (result) {
    return result;
  }
  return await saleModel.createSale(sold);
};

const getSaleById = async (id) => {
  if(!validIdBySale(id))
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found', }
    };
  const result = await saleModel.getSaleById(id);
  console.log('result', result);
  if (!result)
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found', }
    };
  return result;
};

const deleteSale = async (id) => {
  if(!ObjectId.isValid(id))
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format', }
    };
  const result = await saleModel.deleteSale(id);
  console.log('result no delete do Service', result);
  if (!result)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format', }
    };
  return result;
};

module.exports = services = {
  statusHttp,
  quantityIsNumber,
  create,
  getSaleById,
  deleteSale,
};