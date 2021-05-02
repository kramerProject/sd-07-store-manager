const {
  createSalesModel,
  getAllSalesModel,
  getSaleByIdModel,
} = require('../models/salesModel');

const objErr = {
  err: {
    code: 'not_found',
    message: ''
  }
};

const createSalesService = async(salesArrayOfItens) => {
  return await createSalesModel(salesArrayOfItens);
};

const getAllSalesService = async(sales) => {
  return await getAllSalesModel();
};

const getSaleByIdService = async(id) => {
  const objProduct = await getSaleByIdModel(id);
  if(!objProduct) {
    objErr.err.message = 'Sale not found';
    return objErr;
  }
  return objProduct;
};

module.exports = {
  createSalesService,
  getAllSalesService,
  getSaleByIdService,
};
