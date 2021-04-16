const { productModel } = require('../models');
const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameIsString = (name) => typeof name === 'string';

const validNameSize = (name) => name.length >= NAME_MIN_SIZE;

const nameIsUnique = (size) => size === ZERO;

const validQuantity = (quantity) => quantity > ZERO;

const quantityIsInt = (quantity) => Number.isInteger(quantity);

const existsProductId = async (productsIds) => {
  const idsQuantity = productsIds.length;
  const quantityResult = await productModel.countExistentIds(productsIds);

  if (idsQuantity - quantityResult !== ZERO) return false;
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
