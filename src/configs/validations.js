const rescue = require('express-rescue');
const { throwError } = require('./erro');
const { status, errors } = require('./status');

const nameValidation = (name, minName) => {
  return typeof name === 'string' && name.length > minName;
};

const quantityType = (quantity) => {
  return typeof quantity === 'number';
};

const quantityValidation = (quantity, minQuantity) => {
  return quantity > minQuantity;
};

const validateProduct = rescue((req, _res, next) => {
  const { name, quantity } = req.body;

  const minName = 5;
  const minQuantity = 0;

  if (!nameValidation(name, minName)) {
    throw new throwError(status.unprocessableEntity, errors.name);
  }

  if (!quantityType(quantity)) {
    throw new throwError(status.unprocessableEntity, errors.quantityType);
  }

  if (!quantityValidation(quantity, minQuantity)) {
    throw new throwError(status.unprocessableEntity, errors.quantity);
  }

  next();
});

const validateSale = rescue((req, _res, next) => {
  const sales = req.body;

  const minQuantity = 0;

  sales.forEach((sale) => {
    if (!quantityValidation(sale.quantity, minQuantity)) {
      throw new throwError(status.unprocessableEntity, errors.wrongIdOrQuantity);
    }

    if (!quantityType(sale.quantity)) {
      throw new throwError(status.unprocessableEntity, errors.wrongIdOrQuantity);
    }
  });

  next();
});

module.exports = {
  validateProduct,
  validateSale,
};