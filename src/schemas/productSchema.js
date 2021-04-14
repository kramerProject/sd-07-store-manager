const { ObjectId } = require('mongodb');

const erros = {
  name_length: '"name" length must be at least 5 characters long',
  quantity_min: '"quantity" must be larger than or equal to 1',
  quantity_type: '"quantity" must be a number',
  invalid_id: 'Wrong id format',
};

const minNameLength = 5;
const minQuantity = 1;
const code = 422;
let err = {
  code: 'invalid_data'
};

const minLength = (value, min) => (value.length < min);
const isNotNumber = (value) => (typeof value !== 'number');
const minValue = (value, min) => (value < min);
const isValidId = (value) => (ObjectId.isValid(value));

const validateProduct = (name, quantity) => {

  switch (true) {
  case minLength(name, minNameLength):
    err = { ...err, message: erros.name_length };
    return { code, err };
  case minValue(quantity, minQuantity):
    err = { ...err, message: erros.quantity_min };
    return { code, err };
  case isNotNumber(quantity):
    err = { ...err, message: erros.quantity_type };
    return { code, err };
  default: return {};
  }
};

const validateId = (id) => {
  if (isValidId(id)) return {};
  err = { ...err, message: erros.invalid_id };
  return { code, err };
};

module.exports = {
  validateProduct,
  validateId,
};
