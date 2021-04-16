const productsModel = require('../model/productsModel');
const {
  productExistsError,
  productNameLengthError,
  quantityLargerThanZeroError,
  quantityMustBeANumberError,
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
  return productsModel.findAll();
};

module.exports = {
  insertNewProduct,
  findAll,
};
