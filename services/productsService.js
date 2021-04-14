const productsModels = require('../models/productsModels');

const ZERO = 0;
const FIVE = 5;
const ERROR422 = 422;
const STATUS200 = 200;
const STATUS201 = 201;

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

const addProduct = async (name, quantity) => {
  const validateExists = await validateProduct(name);
  const validateName = validateCaracters(name, FIVE);
  const validateQuantity = validateNumber(quantity);
  
  if (validateExists.response) return validateExists;
  if (validateName.response) return validateName;
  if (validateQuantity.response) return validateQuantity;
  const result = await productsModels.addProduct(name, quantity);
  return {
    code: STATUS201,
    response: result,
  };
};


const getByProductId = async (id) => {
  const idIsValid = await validateId(id);
  if (idIsValid.response) return idIsValid;
  const result = await productsModels.getByProductId(id);
  return {
    code: STATUS200,
    response: result,
  };
};

const updateById = async (id, name, quantity) => {
  const validateName = validateCaracters(name, FIVE);
  const validateQuantity = validateNumber(quantity);

  if (validateName.response) return validateName;
  if (validateQuantity.response) return validateQuantity;

  const result = await productsModels.updateById(id, name, quantity);
  return {
    code: STATUS200,
    response: result
  };
};

const deleteProduct = async (id) => {
  const idIsValid = await validateId(id);
  if (idIsValid.response) return idIsValid;

  const result = await productsModels.deleteProduct(id);
  return {
    code: STATUS200,
    response: result
  };
};

module.exports = {
  addProduct,
  getByProductId,
  updateById,
  deleteProduct,
};
