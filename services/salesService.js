const productsModel = require('../models/productsModel');

const validateQuantity = (sales) => {
  let message;
  const one = 1;

  if(typeof sales[0].quantity !== 'number' || sales[0].quantity < one) {
    message = 'Wrong product ID or invalid quantity';
  }
  return message;
};

module.exports = {
  validateQuantity,
};
