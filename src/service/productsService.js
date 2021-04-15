const { getProductByName, getProductsList, registerProduct } = require('../models');

const getProducts = async () => {
  const productsList = await getProductsList();
  return productsList;
};

const insertProduct = async (name, amount) => {
  const nameMinLength = 5;
  if (name.length < nameMinLength) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: 'Unprocessable Entity',
      message: '"name" length must be at least 5 characters long'
    };
  }
  if (!Number.isInteger(amount)) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: 'Unprocessable Entity',
      message: '"quantity" must be a number'
    };
  }
  if (amount < 1) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: 'Unprocessable Entity',
      message: '"quantity" must be larger than or equal to 1'
    };
  }
  const productConflict = await getProductByName(name.toLowerCase());
  if (productConflict) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: 'Unprocessable Entity',
      message: 'Product already exists'
    };
  }
  const insertionResult = await registerProduct(name.toLowerCase(), amount);
  if (!insertionResult.name) {
    return { status: 'Service Unavailable', insertion: insertionResult };
  }
  return { status: 'Created', inserted: insertionResult };
};

module.exports = {
  insertProduct,
  getProducts,
};
