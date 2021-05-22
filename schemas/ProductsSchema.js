const { findByName } = require('../models/ProductsModel');

const isLengthLetterThan = (value, min) => (value.length < min);
const isQuantityLessThan = (value, min) => (value < min);
const isString = (value) => (typeof value === 'string');

const minNameLenght = 5;
const minQuantityValue = 1; 

const validateNameQuantity = async (name, quantity) => {
  switch (true) {
  case (isLengthLetterThan(name, minNameLenght)):
    return ({
      code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    });
  case (await findByName(name) !== null):
    return ({
      code: 'invalid_data',
      message: 'Product already exists'
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

const validateId = (id) => {
  const idLength = 24;
  if (id.length < idLength) return true;
  return false;
};

module.exports = {
  validateNameQuantity,
  validateId,
};
