const { getOnePdt, getProductByName,
  updatePdtById, getProductsList, registerProduct } = require('../models');
const { authPdtAmount, authPdtName } = require('./validateInputs');

const getOneProduct = async (pdtId) => {
  const product = await getOnePdt(pdtId);
  const BAD_INPUT = 'Unprocessable Entity';
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
  const validName = authPdtName(name);  
  if(validName) {
    return validName;
  }
  
  const validAmount = authPdtAmount(amount);
  if(validAmount) {
    return validAmount;
  }

  const productConflict = await getProductByName(name);
  if (productConflict) {
    const BAD_INPUT = 'Unprocessable Entity';
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

const updateProduct = async (name, id, amount) => {
  const validName = authPdtName(name);  
  if(validName) {
    return validName;
  }
  
  const validAmount = authPdtAmount(amount);
  if(validAmount) {
    return validAmount;
  }

  const productUpdated = await updatePdtById(name, id, amount);
  const BAD_INPUT = 'Unprocessable Entity';
  const updatedInfo = { _id: id, name, quantity: amount, err: false };
  return productUpdated.result.ok === 1
    ? { product: updatedInfo, status: 'OK' }
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong id format' };
};

module.exports = {
  getOneProduct,
  getProducts,
  insertProduct,
  updateProduct,
};
