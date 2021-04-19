const {unprocessableEntity} = require('../messagesCodes');
const minQuantity = 0;

const errorsQuantity = {
  err: {
    code: 'invalid_data',
    message :'"quantity" must be larger than or equal to 1',
  }
};

const errorsQuantityType = {
  err: {
    code: 'invalid_data',
    message :'"quantity" must be a number',
  }
};

// fazer um helpers para essas funções
const isQuantityLetterThan = (value, min) => (value <= min);
const isString = (value) => (typeof value === 'string');

const validateQuantity = (quantity) => {
  if(isQuantityLetterThan (quantity, minQuantity)) return {
    code: unprocessableEntity,
    message: errorsQuantity
  };

  if (isString(quantity)) return {
    code: unprocessableEntity,
    message: errorsQuantityType
  };

  return false;
};

module.exports = {validateQuantity};
