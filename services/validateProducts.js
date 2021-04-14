const productsModels = require('../models/productsModels');

const ZERO = 0;
const ERROR422 = 422;


const validateProduct = async (name) => {
  const findProduct = await productsModels.getAll();
  const findName = findProduct.find((product) => product.name == name);
 
  if (findName) return err = {
    response: {err: {
      'code': 'invalid_data', 'message': 'Product already exists' }},
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

const validateNumber = (productNumber) => {
  if (productNumber < ZERO || productNumber === ZERO) return err = {
    response: {err: {
      'code': 'invalid_data', 'message': '"quantity" must be larger than or equal to 1'
    }},
    code: ERROR422,
  };
  if (typeof productNumber !== 'number') return err = {
    response: {err: {
      'code': 'invalid_data', 'message': '"quantity" must be a number',
    }},
    code: ERROR422,
  };
  return true;
};

const validateId = async (id) => {
  const products = await productsModels.getAll();
  const findId = products.find((product) => product._id == id);
  if (!findId) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': 'Wrong id format',
    }},
    code: ERROR422,
  };
  return true;
};

module.exports = {
  validateProduct,
  validateCaracters,
  validateNumber,
  validateId,
};
