const { StatusCodes } = require('http-status-codes');
const { getById } = require('../models/productsModel');
const CustomError = require('./CustomError');

const code = 'invalid_data';

const validateSales = async (req, _res, next) => {
  try {
    const { body } = req;
    const arrayPromise = body
      .map((product) => getById(product.productId));
    const productsList = await Promise.all(arrayPromise);

    productsList.forEach((product) => {
      if (!product) throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        'Product is not registered'
      );
    });

    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = validateSales;
