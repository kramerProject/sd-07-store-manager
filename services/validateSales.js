const salesModels = require('../models/salesModels');

const ZERO = 0;
const ERROR422 = 422;
const ERROR404 = 404;

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

module.exports = {
  validateNumber,
  validateId,
  findSale,
};
