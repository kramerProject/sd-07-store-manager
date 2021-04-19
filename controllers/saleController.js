const Sale = require('../models/saleModel');
const { saleDataValidation } = require('../services/saleDataValidation');
const { saleIdValidation } = require('../services/saleIdValidation');
const { deleteSaleValidation } = require('../services/deleteSaleValidation');

const SUCCESS = 200;
const NOT_FOUND = 404;

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.getAllSales();
    return res.status(SUCCESS).json(sales);
  } catch (err) {
    next(err);
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await saleIdValidation(id);

    const result = await Sale.getSaleById(id);

    res.status(SUCCESS).json(result);
  } catch (err) {
    next();
    return res.status(NOT_FOUND).json(JSON.parse(err.message));
  }
};

const createSale = async (req, res, next) => {
  const reqSale = req.body;

  try {
    await saleDataValidation(reqSale);

    const result = await Sale.createSale(reqSale);

    res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

const updateSale = async (req, res, next) => {
  const reqSale = req.body;
  const { id } = req.params;

  try {
    await saleIdValidation(id);
    await saleDataValidation(reqSale);

    const result = await Sale.updateSale({ id, reqSale });
    if (!result) {
      res.status(NOT_FOUND).json({ message: 'Venda não encontrada' });
      return;
    }
    res.status(SUCCESS).json(result);

  } catch (err) {
    next(err);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteSaleValidation(id);

    const result = await Sale.deleteSale(id);
    res.status(SUCCESS).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
