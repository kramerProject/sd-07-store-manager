const { findItemByName, addItem } = require('../model/productsModel');
const five = 5;
// const zero = 0;
const unprocessable_entity = 422;

function validateName(name) {
  if (name.length < five) {
    throw new Error({
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    });
  }
  const productList = findItemByName(name);
  if (productList) {
    throw new Error({
      'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      }
    });
  };
}

function validateQuantity(quantity) {
  if (quantity < 1) {
    throw new Error({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    });
  }
  if (typeof quantity !== 'number') {
    throw new Error({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    });
  }
}

function serviceAddItem(name, quantity) {
  return addItem(name, quantity);
}

module.exports = {
  validateName,
  serviceAddItem,
  validateQuantity
};