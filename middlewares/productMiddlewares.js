const { UnprocessableException } = require('../utils/errorHandler');
const {
  isValidName,
  isValidQuantity,
  isQuantityNumber,
  isUniqueProduct
} = require('../utils/productValidations');

const {
  getAll
} = require('../models/productModel');

exports.validateNameMiddleware = (req, _res, next) => {
  const invalidNameErrorMessage = '"name" length must be at least 5 characters long';
  const { name } = req.body;
  if (!isValidName(name)) throw new UnprocessableException(invalidNameErrorMessage);
  next();
};

exports.validateQuantityMiddleware = (req, _res, next) => {
  const invalidQuantityErrorMessage = '"quantity" must be larger than or equal to 1';
  const invalidFormatErrorMessage = '"quantity" must be a number';
  const { quantity } = req.body;
  if (!isQuantityNumber(quantity)) throw new UnprocessableException(
    invalidFormatErrorMessage
  );
  if (!isValidQuantity(quantity)) throw new UnprocessableException(
    invalidQuantityErrorMessage
  );
  next();
};

exports.validateUniqueProductsMiddleware = async (req, _res, next) => {
  const invalidNameErrorMessage = 'Product already exists';
  try {
    const { name } = req.body;
    const productList = await getAll();
    const namesList = productList.map((product) => product.name);
    if (!isUniqueProduct(name, namesList)) throw new UnprocessableException(
      invalidNameErrorMessage
    );
    next();
  } catch(err) {
    next(err);
  }
};
