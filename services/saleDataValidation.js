// const Product = require('../models/saleModel');

const code = 'invalid_data';
const quantityValue = 1;

const invalidQuantity = {
  err: {
    code,
    message: 'Wrong product ID or invalid quantity'
  }
};

const quantityIsValid = (quantity) => {
  // console.log(quantity);
  // console.log(typeof quantity);

  if (quantity < quantityValue || typeof quantity !== 'number' )
    throw new Error(JSON.stringify(invalidQuantity));
};

const saleDataValidation = (reqSale) => {
  // console.log(reqSale);
  const quantity = (reqSale[0].quantity);

  quantityIsValid(quantity);
};

module.exports = {
  saleDataValidation,
};
