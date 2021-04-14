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

const deleteSale = async (id) => {
  const deletedProduct = await salesModel.deleteSale(id);
  
  if(!deletedProduct) {
    errorObj.err.code = 'invalid_data';
    errorObj.err.message = 'Wrong sale ID format';
    return errorObj;
  }

  return deletedProduct;
};

module.exports = {
  createSale,
  getSaleById,
  deleteSale
};
