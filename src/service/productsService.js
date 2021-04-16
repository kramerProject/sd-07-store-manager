const {
  getOnePdt,
  getProductByName, getProductsList, registerProduct } = require('../models');

const BAD_INPUT = 'Unprocessable Entity';

const getOneProduct = async (pdtId) => {
  const product = await getOnePdt(pdtId);
  return product
    ? { product: product, status: 'OK' }
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong id format' };
};

const getProducts = async () => {
  const productsList = await getProductsList();
  return productsList
    ? { products: productsList, status: 'OK' }
    : { err: 'no products in database' };
};

const insertProduct = async (name, amount) => {
  const nameMinLength = 5;
  if (name.length < nameMinLength) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: BAD_INPUT,
      message: '"name" length must be at least 5 characters long'
    };
  }
  if (!Number.isInteger(amount)) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: BAD_INPUT,
      message: '"quantity" must be a number'
    };
  }
  if (amount < 1) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: BAD_INPUT,
      message: '"quantity" must be larger than or equal to 1'
    };
  }
  const productConflict = await getProductByName(name);
  if (productConflict) {
    return {
      err: 'invalid_data',
      clientErr: true,
      status: BAD_INPUT,
      message: 'Product already exists'
    };
  }
  const insertionResult = await registerProduct(name, amount);
  if (!insertionResult.name) {
    return { status: 'Service Unavailable', insertion: insertionResult };
  }
  return { status: 'Created', inserted: insertionResult };
};

module.exports = {
  getOneProduct,
  insertProduct,
  getProducts,
};
