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
let objSold = {};

const quantityIsNumber = (objSold) => {
  const { quantity } = objSold;
  if (Number.isInteger(quantity))
    return true;
};

const validId = (objSold) => {
  const { productId } = objSold;
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
  sold.forEach(function (item) {
    for (let i in item) {
      objSold[i] = item[i];
    }
  });
  if(!validId(objSold)
  || !quantityIsNumber(objSold)
  || objSold.quantity <= ZERO)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity', }
    };
  return await saleModel.createSale(sold);
};

const getSaleById = async (id) => {
  if(!validIdBySale(id))
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found', }
    };
  return await saleModel.getSaleById(id);
};

module.exports = services = {
  statusHttp,
  quantityIsNumber,
  create,
  getSaleById,
};