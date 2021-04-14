const { sendError } = require('./erro');
const { status, errors } = require('./status');

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const minName = 5;
  const minQuantity = 0;

  if (typeof name !== 'string' || name.length <= minName) {
    sendError(status.unprocessableEntity, errors.nameProduct, res);
  }

  if (typeof quantity !== 'number') {
    sendError(status.unprocessableEntity, errors.quantityType, res);
  }

  if (quantity <= minQuantity) {
    sendError(status.unprocessableEntity, errors.quntityInvalidation, res);
  }

  next();
};

module.exports = {
  validateProduct,
};
