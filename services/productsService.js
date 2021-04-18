const productsModel = require('../models/productsModel');
const STATUS_CODE = require('../helper');

// Requisito 1

const checkNameLength = (name) => {
  const CINCO = 5;
  if (name.length < CINCO) throw ({ 
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
  }); 
};

const checkNameOfProductExist = async (name) => {
  const result = await productsModel.findProduct(name);
  if (result) throw ({ 
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Product already exists'
  }); 
};

const checkProductQuantity = (quantity) => {
  const ZERO = 0;
  if (parseInt(quantity, 10) <= ZERO) throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1'
  });
};

const checkIfQuantityIsString = (quantity) => {
  if (typeof quantity !== 'number') throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: '"quantity" must be a number'
  });
};


const productRegistration = async (name, quantity) => {
  checkNameLength(name);
  await checkNameOfProductExist(name);
  checkProductQuantity(quantity);
  checkIfQuantityIsString(quantity);

  const result = await productsModel.productRegistration(name, quantity);
  return result;
};

// Requisito 2

const allProductsList = async () => {
  const result = await productsModel.allProductsList();
  return result;
};

const checkProductByID = (result) => {
  if (result === null) throw ({ 
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Wrong id format'
  });
};

const getProductByID = async (id) => {
  const result = await productsModel.getProductByID(id);
  checkProductByID(result);
  return result;
};

module.exports = {
  productRegistration,
  allProductsList,
  getProductByID
};