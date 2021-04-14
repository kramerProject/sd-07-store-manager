const productsModel = require('../models/productsModel');
const status = require('../utils/status');

const isProductInList = async (name) => {
  const products = await productsModel.getAllProducts();
  const isThereProduct = products.some(products => products.name === name);
  return isThereProduct;
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
  const isThereProduct = await isProductInList(name);
  if (isThereProduct) {
    return res.status(status.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const validateJustName = async (req, res, next) => {
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

const validateProductQuantity = (req, res, next) => {
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

const validateProductQuantityAndID = (req, res, next) => {
  const { body } = req;
  const zero = 0;
  const areValuesValid = body
    .some((item) => {
      return typeof item.quantity !== 'number' || item.quantity <= zero;
    });

  if (areValuesValid) {
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
  validateProductQuantity,
  validateJustName,
  validateProductQuantityAndID
};
