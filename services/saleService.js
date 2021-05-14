const modelSales = require('../models/salesModel');
const validation = require('./saleValidation');

const OK = 200;

const insertSale = async (array) => {
  const quantityValidation = validation.numberValidation(array);
  if (quantityValidation.response) return quantityValidation;

  const result = await modelSales.insertSale(array);
  return {
    code: OK,
    response: result,
  };
};

const findSaleById = async (id) => {
  const idValid = await validation.idValidation(id);
  if (idValid.response) return idValid;
  const result = await modelSales.findSaleById(id);
  return {
    code: OK,
    response: result,
  };
};

const updateSaleById = async (id, array) => {
  const quantityValidation = validation.numberValidation(array);
  if (quantityValidation.response) return quantityValidation;

  const result = await modelSales.updateSaleById(id, array);
  return {
    code: OK,
    response: result
  };
};

const deleteSale = async (id) => {
  const saleValidation = await validation.findSale(id);
  if (saleValidation.response) return saleValidation;

  const result = await modelSales.deleteSale(id);
  return {
    code: OK,
    response: result
  };
};

module.exports = {
  insertSale,
  findSaleById,
  updateSaleById,
  deleteSale,
};

