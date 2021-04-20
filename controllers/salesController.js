const status = require('../config/status');
const salesService = require('../service/salesService');

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

module.exports = {
  addSalesController,
  getAllSalesController,
  getByIdSalesController
};
