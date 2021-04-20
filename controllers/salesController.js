const status = require('../config/status');
const salesService = require('../service/salesService');
const salesModel = require('../models/salesModel');

const addSalesController = async (req, res, next) => {
  try {
    const products = req.body;
    const newSale = await salesService.addSalesService(products);
    if (newSale.code) return next(newSale);
    return res.status(status.SUCCESS).json(newSale);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const getAllSalesController = async (_req, res, next) => {
  try {
    const list = await salesService.getAllSalesService();
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getByIdSalesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await salesService.getByIdSalesService(id);
    if (list.code) return next(list);
    return res.status(status.SUCCESS).json(list);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const putByIdSalesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await salesService.putByIdSalesService(id, data);
    if (result.code) return next(result);
    return res.status(status.SUCCESS).json(result);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteSalesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = await salesModel.findByIdSalesModel(id);
    if (!saleId)
      return res.status(status.UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      });
    const sale = await salesService.deleteSalesService(id);
    // if (sale.code) return next(sale);
    return res.status(status.SUCCESS).json(sale);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  addSalesController,
  getAllSalesController,
  getByIdSalesController,
  putByIdSalesController,
  deleteSalesController,
};
