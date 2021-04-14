const salesModels = require('../models/salesModels');
const validate = require('./validateSales');

const STATUS200 = 200;

const addSales = async (array) => {
  const validateQuantity = validate.validateNumber(array);
  if (validateQuantity.response) return validateQuantity;

  const result = await salesModels.addSales(array);
  return {
    code: STATUS200,
    response: result,
  };
};

const getSaleById = async (id) => {
  const idIsValid = await validate.validateId(id);
  if (idIsValid.response) return idIsValid;
  const result = await salesModels.getSaleById(id);
  return {
    code: STATUS200,
    response: result,
  };
};

const updateById = async (id, array) => {
  const validateQuantity = validate.validateNumber(array);
  if (validateQuantity.response) return validateQuantity;

  const result = await salesModels.updateById(id, array);
  return {
    code: STATUS200,
    response: result
  };
};

const deleteSale = async (id) => {
  const saleValid = await validate.findSale(id);
  if (saleValid.response) return saleValid;

  const result = await salesModels.deleteSale(id);
  return {
    code: STATUS200,
    response: result
  };
};

module.exports = {
  addSales,
  getSaleById,
  updateById,
  deleteSale,
};
