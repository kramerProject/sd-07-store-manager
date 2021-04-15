const ProductsModels = require('../models/ProductsModels');
const {
  compare,
  status,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
  messageError
} = require('./Helpers');

const minLengthOf = (value, number) => (value.length < number);

const productExists = async (value) => {
  const productFound = await ProductsModels.getByName(value);
  if (productFound !== null) return true;
};

const createNewProduct = async (name, quantity) => {
  switch (true) {
  case minLengthOf(name, compare.minSize):
    return messageError(status.code422, message.nameLength);
  case greaterThan(quantity, compare.zeroQuantity):
    return messageError(status.code422, message.greaterThanZero);
  case mustBeNumber(quantity):
    return messageError(status.code422, message.mustBeNumber);
  case await productExists(name):
    return messageError(status.code422, message.alreadyExists);
  default:
    break;
  }

  const product = await ProductsModels.createNewProduct(name, quantity);
  
  
  return {
    code: status.code201,
    product
  };
};

const getAllProducts = async (_request, response) => {
  const allProducts = await ProductsModels.getAll();
  // console.log('allProducts[0]', allProducts[0]);
  return response.status(status.code200).json({products: allProducts});
};

const getById = async (request, response) => {
  const { id } = request.params;

  if (id.length !== compare.hexObjectedId) {
    return responseWith(status.code422, message.wrongIdFormat, response);
  }

  const productFound = await ProductsModels.getById(id);

  if (productFound === null) {
    return messageError(status.code422, message.wrongIdFormat);
  }

  return response.status(status.code200).json(productFound);
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  switch(true) {
  case minLengthOf(name, compare.minSize):
    return responseWith(status.code422, message.nameLength, response);
  case greaterThan(quantity, compare.zeroQuantity):
    return responseWith(status.code422, message.greaterThanZero, response);
  case mustBeNumber(quantity):
    return responseWith(status.code422, message.mustBeNumber, response);
  default:
    break;
  }

  const productUpdate = await ProductsModels.updateProduct(id, name, quantity);

  return await response.status(status.code200).json(productUpdate);
};

const deleteProducts = async (request, response) => {
  const { id } = request.params;

  if (id.length !== compare.hexObjectedId) {
    return responseWith(status.code422, message.wrongIdFormat, response);
  }

  const productRemoved = await ProductsModels.getById(id);

  await ProductsModels.deleteProducts(id);

  return response.status(status.code200).json(productRemoved);
};  

module.exports = {
  createNewProduct,
  getAllProducts,
  getById,
  updateProduct,
  deleteProducts,
};
