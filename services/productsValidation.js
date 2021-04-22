const productsModel = require('../models/productsModel');

const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const productValidation = async (name) => {
  const findProduct = await productsModel.findAll();
  const findByName = findProduct.find((product) => product.name == name);
 
  if (findByName) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': 'Product already exists',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  return true;
};

const charactersValidation = (name, number) => {
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

const numberValidation = (numberOfTheProduct) => {
  if (numberOfTheProduct < ZERO || numberOfTheProduct === ZERO) return err = {
    response: {
      err: {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1',
      }},
    code: UNPROCESSABLE_ENTITY,
  };
  if (typeof numberOfTheProduct !== 'number') return err = {
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
  const product = await productsModel.findAll();
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
  charactersValidation,
  numberValidation,
  idValidation,
};
