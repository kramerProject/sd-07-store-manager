const { findByName } = require('../models/ProductsModel');

const isLengthLetterThan = (value, min) => (value.length < min);
const isQuantityLessThan = (value, min) => (value < min);
const isString = (value) => (typeof value === 'string');

const validate = async (name, quantity) => {
  switch (true) {
    case (isLengthLetterThan(name, 5)):
      return ({
        code: 'invalid_data',
        message: "\"name\" length must be at least 5 characters long"
      });
    case (await findByName(name) !== null):
      return ({
        code: 'invalid_data',
        message: "Product already exists"
      });
    case (isQuantityLessThan(quantity, 1)):
      return ({
        code: 'invalid_data',
        message: "\"quantity\" must be larger than or equal to 1"
      });
    case (isString(quantity)):
      return ({
        code: 'invalid_data',
        message: "\"quantity\" must be a number"
      });
    default: return {}
  };
};

module.exports = {
  validate,
};
