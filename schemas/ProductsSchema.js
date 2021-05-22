const { findByName } = require('../models/ProductsModel');

const isLengthLetterThan = (value, min) => (value.length < min);
const isQuantityLessThan = (value, min) => (value < min);
const isString = (value) => (typeof value === 'string');

const minNameLenght = 5;
const minQuantityValue = 1; 

const validateNameQuantity = (name, quantity) => {
  switch (true) {
  case (isLengthLetterThan(name, minNameLenght)):
    return ({
      code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    });
  case (isQuantityLessThan(quantity, minQuantityValue)):
    return ({
      code: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1'
    });
  case (isString(quantity)):
    return ({
      code: 'invalid_data',
      message: '\"quantity\" must be a number'
    });
  default: return {};
  };
};

const nameExist = async (name) => {
  const validate = await findByName(name);
  if (validate !== null) {
    return ({
      code: 'invalid_data',
      message: 'Product already exists'
    });
  }
  return {};
};

const validateId = (id) => {
  const idLength = 24;
  if (id.length < idLength) return true;
  return false;
};

module.exports = {
  validateNameQuantity,
  validateId,
  nameExist,
};
