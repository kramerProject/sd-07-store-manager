function isValidName(name) {
  const minLength = 5;
  if (name.length <= minLength) return false;
  return true;
}

function isValidQuantity(quantity) {
  const ONE = 1;
  if (quantity < ONE) return false;
  return true;
}

function isQuantityNumber(quantity) {
  if (typeof(quantity) !== 'number') return false;
  return true;
}

function isUniqueProduct(name, namesList, invalidNameErrorMessage) {
  if (namesList.includes(name)) return false;
  return true;
}

module.exports = {
  isValidName,
  isValidQuantity,
  isQuantityNumber,
  isUniqueProduct
};
