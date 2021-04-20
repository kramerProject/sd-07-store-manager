const {
  createSales,
  // getAllModel,
} = require('../models/salesModel');

const validateQuantity = (sales) => {
  const forbiddenQuantity = 0;
  const isValid = sales.some(
    (sale) => sale.quantity <= forbiddenQuantity || typeof sale.quantity !== 'number');
  
  if (isValid) {
    throw new Error('Wrong product ID or invalid quantity');
  }

  return false;
};

const createSalesService = async (sales) => {
  validateQuantity(sales);

  const createdSales = await createSales(sales);
  return createdSales;
};

// const getllService = () => {

// };

module.exports = {
  createSalesService,
  // getllService,
};