const salesModels = require('../models/salesModels');

const ZERO = 0;
const ERROR422 = 422;
const ERROR404 = 404;
const STATUS200 = 200;

const validateNumber = (array) => {
  const result = array.map((item) => {
    if(item.quantity <= ZERO || typeof item.quantity !== 'number') return true;
    return false;
  });
  if (result.some(elem => elem === true)) return err = {
    response: {err: {
      'code': 'invalid_data', 'message': 'Wrong product ID or invalid quantity'
    }},
    code: ERROR422,
  };
  return true;
};

const validateCaracters = (name, number) => {
  if (name.length < number) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long',
    }},
    code: ERROR422,
  };
  return true;
};

const validateId = async (id) => {
  const sales = await salesModels.getAll();
  const findId = sales.find((product) => product._id == id);
  if (!findId) return err = {
    response: {err: {
      'code': 'not_found',
      'message': 'Sale not found',
    }},
    code: ERROR404,
  };
  return true;
};

const findSale = async (id) => {
  const sales = await salesModels.getAll();
  const findId = sales.find((product) => product._id == id);
  if (!findId) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': 'Wrong sale ID format',
    }},
    code: ERROR422,
  };
  return true;
};
const addSales = async (array) => {
  const validateQuantity = validateNumber(array);
  if (validateQuantity.response) return validateQuantity;

  const result = await salesModels.addSales(array);
  return {
    code: STATUS200,
    response: result,
  };
};

const getSaleById = async (id) => {
  const idIsValid = await validateId(id);
  if (idIsValid.response) return idIsValid;
  const result = await salesModels.getSaleById(id);
  return {
    code: STATUS200,
    response: result,
  };
};

const updateById = async (id, array) => {
  const validateQuantity = validateNumber(array);
  if (validateQuantity.response) return validateQuantity;

  const result = await salesModels.updateById(id, array);
  return {
    code: STATUS200,
    response: result
  };
};

const deleteSale = async (id) => {
  const saleValid = await findSale(id);
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
