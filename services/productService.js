const { productModel } = require('../models');
const { ObjectId } = require('mongodb');
const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameIsString = (name) => typeof name === 'string';

const validNameSize = (name) => name.length >= NAME_MIN_SIZE;

const nameIsUnique = (size) => size === ZERO;

const validQuantity = (quantity) => quantity > ZERO;

const quantityIsInt = (quantity) => Number.isInteger(quantity);

const existsProductId = async (productsIds) => {
  productsIds.forEach(productId => {
    if (!ObjectId.isValid(productId)) return false;
  });
  // const idsQuantity = productsIds.length;
  // console.log('qnt original:', idsQuantity, 'qnt com ids unicos:', array);
  // const quantityResult = await productModel.countExistentIds(productsIds);
  
  // if (qntd - quantityResult !== ZERO) return false;
  return true;
};

module.exports = {
  nameIsString,
  validNameSize,
  nameIsUnique,
  validQuantity,
  quantityIsInt,
  existsProductId
};
