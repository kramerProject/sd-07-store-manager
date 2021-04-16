const salesModel = require('../models/salesModel');

const checkQuantity = (element) => {
  const ZERO = 0;
  return typeof element.quantity === 'number' && element.quantity > ZERO;
};

const validate = (data) => {
  if (!data.every(checkQuantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return {};
};

const addSales = async (data) => {
  const validationsSold = validate(data);
  if (validationsSold.err) return validationsSold;

  const sold = await salesModel.addSales(data);
  return sold;
};

module.exports = { addSales };
