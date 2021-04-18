const { UnprocessableException, StockProblem } = require('../utils/errorHandler');
const { validateSale, validateStock } = require('../services/saleService');
const { getAll } = require('../models/productModel');

exports.validateSaleMiddleware = async (req, _res, next) => {
  const invalidSaleErrorMessage = 'Wrong product ID or invalid quantity';
  try {
    const isUpdate = req.method === 'UPDATE' ? true : false;
    const productsList = await getAll();
    const itemsSold = req.body;
    if (!validateSale(productsList, itemsSold, isUpdate)) {
      throw new UnprocessableException(
        invalidSaleErrorMessage
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.validateStockMiddleware = async(req, _res, next) => {
  const stockErrorMessage = 'Such amount is not permitted to sell';
  try {
    const itemsSold = req.body;
    const productsList = await getAll();
    if (!validateStock(itemsSold, productsList)) {
      throw new StockProblem(stockErrorMessage);
    }
    next();
  } catch (err) {
    next(err);
  }
};
