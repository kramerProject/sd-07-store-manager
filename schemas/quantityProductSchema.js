const {paymentRequired} = require('../messagesCodes');
const minQuantity = 0;

const errorsQuantity = {
  name_length: {
    err: {
      code: 'invalid_data',
      message :'"quantity" must be larger than or equal to 1',
    }
  }
};

const errorsQuantityType = {
  name_length: {
    err: {
      code: 'invalid_data',
      message :'"quantity" must be a number',
    }
  }
};

// fazer um helpers para essas funções
const isQuantityLetterThan = (value, min) => (value <= min);
const isString = (value) => (typeof value === 'string');

const validateQuantity = (quantity) => {
  if(isQuantityLetterThan (quantity, minQuantity)) return {
    code: paymentRequired,
    message: errorsQuantity
  };

  if (isString(quantity)) return {
    code: paymentRequired,
    message: errorsQuantityType
  };

  return false;
};

module.exports = {validateQuantity};
