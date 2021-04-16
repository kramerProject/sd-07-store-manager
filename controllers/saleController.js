const Sale = require('../models/saleModel');
const { UnprocessableException } = require('../utils/errorHandler');

const SUCCESS = 200;
const CREATED = 201;

const createSaleController = async (req, res, next) => {
  const wrongIdFormatErrorMessage = 'Wrong id format';
  try {
    const itemsSold = req.body;
    const result = await Sale.createSale(itemsSold);
    if (result !== null) return res.status(SUCCESS).json(result);
    throw new UnprocessableException(
      wrongIdFormatErrorMessage
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSaleController
};