const Sale = require('../models/saleModel');
const { UnprocessableException, NotFound } = require('../utils/errorHandler');

const SUCCESS = 200;
const CREATED = 201;

const getAllSalessController = async (_req, res, next) => {
  try {
	  const sales = await Sale.getAll();
    const result = { sales };
    return res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

const getSaleByIdController = async (req, res, next) => {
  const wrongIdFormatErrorMessage = 'Sale not found';
  try {
    const { id } = req.params;
    const result = await Sale.getById(id);
    if (result !== null) return res.status(SUCCESS).json(result);
    throw new NotFound(
      wrongIdFormatErrorMessage
    );
  } catch (err) {
    next(err);
  }
};

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
  createSaleController,
  getAllSalessController,
  getSaleByIdController
};