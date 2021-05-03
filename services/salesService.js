const {
  createSalesModel,
  getAllSalesModel,
  getSaleByIdModel,
  updateSaleModel,
  deleteSaleModel,
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

const getAllSalesService = async() => {
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

const updateSaleService = async(id, salesArrayOfItens) => {
  return await updateSaleModel(id, salesArrayOfItens);
};

const deleteSaleService = async(id) => {
  const objDeleted = await deleteSaleModel(id);
  if (!objDeleted) {
    objErr.err.code = 'invalid_data';
    objErr.err.message = 'Wrong sale ID format';
    return objErr;
  }
  return objDeleted;
};

module.exports = {
  createSalesService,
  getAllSalesService,
  getSaleByIdService,
  updateSaleService,
  deleteSaleService,
};
