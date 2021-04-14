const productsModels = require('../models/productsModels');
const validate = require('./validateProducts');

const FIVE = 5;

const STATUS200 = 200;
const STATUS201 = 201;


const addProduct = async (name, quantity) => {
  const validateExists = await validate.validateProduct(name);
  const validateName = validate.validateCaracters(name, FIVE);
  const validateQuantity = validate.validateNumber(quantity);
  
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
  const idIsValid = await validate.validateId(id);
  if (idIsValid.response) return idIsValid;
  const result = await productsModels.getByProductId(id);
  return {
    code: STATUS200,
    response: result,
  };
};

const updateById = async (id, name, quantity) => {
  const validateName = validate.validateCaracters(name, FIVE);
  const validateQuantity = validate.validateNumber(quantity);

  if (validateName.response) return validateName;
  if (validateQuantity.response) return validateQuantity;

  const result = await productsModels.updateById(id, name, quantity);
  return {
    code: STATUS200,
    response: result
  };
};

const deleteProduct = async (id) => {
  const idIsValid = await validate.validateId(id);
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
