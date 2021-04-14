const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameIsString = (name) => typeof name === 'string';

const validNameSize = (name) => name.length >= NAME_MIN_SIZE;

const nameIsUnique = (name, data) => !data.some((product) => product.name === name);

const validQuantity = (quantity) => quantity > ZERO;

const quantityIsInt = (quantity) => Number.isInteger(quantity);

module.exports = {
  nameIsString,
  validNameSize,
  nameIsUnique,
  validQuantity,
  quantityIsInt
};
