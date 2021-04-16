const helper = require('../helpers/isValid');

const validations = (name, quantity) => {

  const nameType = helper.nameIsAString(name);
  const nameLength = helper.nameIsOk(name);
  const quantityLength = helper.quantityIsOk(quantity);
  const quantityIsInteger = helper.IsInteger(quantity);

  if (nameLength.code) return nameLength;

  if (quantityIsInteger.code) return quantityIsInteger;

  if (nameType.code) return nameType;

  if (quantityLength.code) return quantityLength;
  
};

module.exports = validations;
