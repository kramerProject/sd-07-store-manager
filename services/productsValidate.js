const modelProduct = require('../models/productsModel');

const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const productValidation = async (name) => {
  const findProduct = await modelProduct.findAll();
  const findName = findProduct.find((product) => product.name == name);

  if (findName) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': 'Product already exists',
      }
    },
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

const characterValidation = (name, number) => {
  if (name.length < number) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

const numberValidation = (numberProduct) => {
  if (numberProduct < ZERO || numberProduct === ZERO) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  if (typeof numberProduct !== 'number') return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': '"quantity" must be a number',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

const idValidation = async (id) => {
  const product = await modelProduct.findAll();
  const findById = product.find((product) => product._id == id);
  if (!findById) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': 'Wrong id format',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

module.exports = {
  productValidation,
  numberValidation,
  idValidation,
  characterValidation,
};

