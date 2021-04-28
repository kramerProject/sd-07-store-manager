const productsModel = require('../models/modelProducts');
const status = require('../utils/status');

const localeProduct = async (name) => {
  const products = await productsModel.productsGet();
  const isProduct = products.some(products => products.name === name);
  return isProduct;
};

const validateProductName = async (req, res, next) => {
  const { name } = req.body;
  const five = 5;
  if (name.length < five) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  const isProduct = await localeProduct(name);
  if (isProduct) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const validateLengthName = async (req, res, next) => {
  const { name } = req.body;
  const five = 5;
  if (name.length < five) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  next();
};

const validateProductAmmount = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  if (Number(quantity) <= zero) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  if (typeof (quantity) !== 'number') {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

const validateProductAmmountAndID = (req, res, next) => {
  const { body } = req;
  const zero = 0;
  const validValues = body
    .some((item) => {
      return typeof item.quantity !== 'number' || item.quantity <= zero;
    });

  if (validValues) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

module.exports = {
  validateProductName,
  validateProductAmmount,
  validateLengthName,
  validateProductAmmountAndID
};
