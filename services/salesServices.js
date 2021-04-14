const salesModel = require('../models/salesModel');

const addWithValidation = async (sales) => {
  const zero = 0;
  for (let i = zero; i < sales.length; i += 1) {
    const product = sales[i];
    if (product.quantity < 1 || typeof(product.quantity) != 'number') {
      return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  }

  const itensSold = await salesModel.add(sales);
  return itensSold;
};

module.exports = {
  addWithValidation,
};
