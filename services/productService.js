const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameIsString = (name) => typeof name === 'string';

const validNameSize = (name) => name.length >= NAME_MIN_SIZE;

const nameIsUnique = (size) => size === ZERO;

const validQuantity = (quantity) => quantity > ZERO;

const quantityIsInt = (quantity) => Number.isInteger(quantity);

module.exports = {
  nameIsString,
  validNameSize,
  nameIsUnique,
  validQuantity,
  quantityIsInt
};
