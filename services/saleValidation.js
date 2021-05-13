const modelSales = require('../models/salesModel');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const ZERO = 0;

const numberValidation = (array) => {
  const result = array.map((item) => {
    if(item.quantity <= ZERO || typeof item.quantity !== 'number') return true;
    return false;
  });
  if (result.some(element => element === true)) return err = {
    response: {
      err: {
        'code': 'invalid_data', 'message': 'Wrong product ID or invalid quantity'
      }
    },
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

const idValidation = async (id) => {
  const allSales = await modelSales.findAll();
  const findById = allSales.find((product) => product._id == id);
  if (!findById) return err = {
    response: {
      err: {
        'code': 'not_found',
        'message': 'Sale not found',
      }
    },
    code: NOT_FOUND,
  };
  return true;
};

const findSale = async (id) => {
  const allSales = await modelSales.findAll();
  const findById = allSales.find((product) => product._id == id);
  if (!findById) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': 'Wrong sale ID format',
      }
    },
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

module.exports = {
  numberValidation,
  idValidation,
  findSale,
};
