const salesService = require('../services/salesService');
const {StatusCodes} = require('http-status-codes');

const getAll = async (_req, res, next) => {
  try {
    const result = await salesService.getAllSales();
    return res.status(StatusCodes.OK).json({
      sales: result,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.readSalesById(id);
    return res.status(StatusCodes.OK).json(result);

  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const addSales = async (req, res, next) => {
  try {
    const { body } = req;
    const newSales = await salesService.addSales(body);
    return res.status(StatusCodes.OK).json(newSales);

  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const updateSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await salesService.updateSaleById(id, body);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

const deleteSales = async (req, res, next ) => {
  try {
    await salesService.deleteSaleById(req.params.id);
    return res.status(StatusCodes.OK).end();

  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

module.exports = {
  getAll,
  getSalesById,
  addSales,
  updateSales,
  deleteSales
};
