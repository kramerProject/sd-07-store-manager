const salesModel = require('../models/salesModel');

const validate = (data) => {
  const ZERO = 0;
  const quantity = data.every((e) => e.quantity > ZERO && typeof e.quantity === 'number');
  if (!quantity) {
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
  /*   const tr = data.every((e) => typeof e.productId === 'string');
  const num = data.every((e) => e.quantity >= 0 && typeof e.quantity === 'number'); */
  const validationsSold = validate(data);
  if (validationsSold.err) return validationsSold;

  const sold = await salesModel.addSales(data);
  return sold;
};

module.exports = { addSales };
