const { productModel } = require('../models');
const { ObjectId } = require('mongodb');
const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameIsString = (name) => typeof name === 'string';

const validNameSize = (name) => name.length >= NAME_MIN_SIZE;

const nameIsUnique = (size) => size === ZERO;

const validQuantity = (quantity) => quantity > ZERO;

const quantityIsInt = (quantity) => Number.isInteger(quantity);

const existsProductId = (productsIds) => {
  const validation = productsIds.map(productId => {
    if (!ObjectId.isValid(productId)) return false;
    return true;
  });

  const notExists = validation.some(validation => validation === false);

  // Refatorar depois essa lógica
  // const idsQuantity = productsIds.length;
  // console.log('qnt original:', idsQuantity, 'qnt com ids unicos:', array);
  // const quantityResult = await productModel.countExistentIds(productsIds);
  
  // if (qntd - quantityResult !== ZERO) return false;
  return !notExists;
};

module.exports = {
  nameIsString,
  validNameSize,
  nameIsUnique,
  validQuantity,
  quantityIsInt,
  existsProductId
};
