const { delProduct, getOnePdt, getProductByName,
  updatePdtById, getProductsList, registerProduct } = require('../models');
const { authPdtAmount, authPdtName } = require('./validateInputs');

const BAD_INPUT = 'Unprocessable Entity';


const deleteProduct = async (pdtId) => {
  const deletionRes = await delProduct(pdtId);
  return deletionRes.result.ok === 1
    ? { status: 'OK' }
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong id format' };
};

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
  const updatedInfo = { _id: id, name, quantity: amount, err: false };
  return productUpdated.result.ok === 1
    ? { product: updatedInfo, status: 'OK' }
    : { err: 'invalid_data', status: BAD_INPUT,
      clientErr: true, message: 'Wrong id format' };
};

module.exports = {
  deleteProduct,
  getOneProduct,
  getProducts,
  insertProduct,
  updateProduct,
};
