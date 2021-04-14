const rescue = require('express-rescue');
const { throwError } = require('./erro');
const { status, errors } = require('./status');

const validateProduct = rescue((req, _res, next) => {
  const { name, quantity } = req.body;

  const minName = 5;
  const minQuantity = 0;

  if (!(typeof name === 'string' && name.length > minName)) {
    throw new throwError(status.unprocessableEntity, errors.nameProduct);
  }

  if (!typeof quantity === 'number') {
    throw new throwError(status.unprocessableEntity, errors.quantityType);
  }

  if (!quantity > minQuantity) {
    throw new throwError(status.unprocessableEntity, errors.quntityInvalidation);
  }

  next();
});

module.exports = {
  validateProduct,
};
