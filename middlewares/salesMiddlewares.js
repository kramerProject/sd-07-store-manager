const { UnprocessableException } = require('../utils/errorHandler');
const { validateSale } = require('../services/saleService');
const { getAll } = require('../models/productModel');

exports.validateSaleMiddleware = async (req, _res, next) => {
  const invalidSaleErrorMessage = 'Wrong product ID or invalid quantity';
  try {
    const productsList = await getAll();
    const itemsSold = req.body;
    if (!validateSale(productsList, itemsSold)) {
      throw new UnprocessableException(
        invalidSaleErrorMessage
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
