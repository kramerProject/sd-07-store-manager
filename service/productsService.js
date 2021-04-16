const { ObjectId } = require('mongodb');
const productsModel = require('../model/productsModel');
const {
  productExistsError,
  productNameLengthError,
  quantityLargerThanZeroError,
  quantityMustBeANumberError,
  invalidIdFormatError
} = require('../errors/errors');

const insertNewProduct = async (name, quantity) => {
  const minimalLength = 5;
  const NoSenseStock = 0;
  const isExists = await productsModel.verifyName(name);
  if (isExists) throw new Error(JSON.stringify(productExistsError));
  if (name.length < minimalLength) 
    throw new Error(JSON.stringify(productNameLengthError));
  if (quantity <= NoSenseStock) 
    throw new Error(JSON.stringify(quantityLargerThanZeroError));
  if (typeof quantity !== 'number') 
    throw new Error(JSON.stringify(quantityMustBeANumberError));

  return productsModel.insertNewProduct(name, quantity);
};

const findAll = async () => {
  const result = await productsModel.findAll();
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error((JSON.stringify(invalidIdFormatError)));
  const result = await productsModel.findById(new ObjectId(id));
  const emptyValue = 0;
  if (result.length === emptyValue) throw new Error(JSON.stringify(invalidIdFormatError));

  return result;
};

module.exports = {
  insertNewProduct,
  findAll,
  findById,
};
