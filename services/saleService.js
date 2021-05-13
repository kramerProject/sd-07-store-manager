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

module.exports = {
  insertSale,
  findSaleById,
};

