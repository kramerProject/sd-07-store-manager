const salesModel = require('../models/salesModel');
const errorObj = {
  err: {
    code: 'not_found',
    message: ''
  }
};

const createSale = async (saleArray) => {
  return await salesModel.createSale(saleArray);
};

const getSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);
  
  if(!saleById) {
    errorObj.err.message = 'Sale not found';
    return errorObj;
  }

  return productById;
};

module.exports = {
  createSale,
  getSaleById
};
