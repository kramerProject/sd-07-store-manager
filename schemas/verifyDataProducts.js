const productsModel = require('../model/productsModel');

const zero = 0;
const five = 5;

const code = {
  invalid_data: 'invalid_data',
};

const message = {
  name_length: '"name" length must be at least 5 characters long',
  product_exists: 'Product already exists',
  quantity_less_than_zero: '"quantity" must be larger than or equal to 1',
  quantity_not_number: '"quantity" must be a number'
};

const isLengthLetterThan = (value, min) => (value.length < min);
const isProductRepeated = (products, name) => products
  .some((product) => product.name === name);
const isQuantityLessThanZero = (quantity) => (quantity <= zero);
const isNotNumber = (quantity) => (typeof quantity !== 'number');


const verifyDataProducts = async ( name, quantity ) => {
  const products = await productsModel.getAll();

  switch(true) {
  case isLengthLetterThan(name, five): 
    return { code: code.invalid_data, message: message.name_length };
  case isQuantityLessThanZero(quantity):
    return { code: code.invalid_data, message: message.quantity_less_than_zero };
  case isNotNumber(quantity):
    return { code: code.invalid_data, message: message.quantity_not_number };
  case isProductRepeated(products, name):
    return { code: code.invalid_data, message: message.product_exists };
  default: return {};
  }
};

module.exports = verifyDataProducts;
