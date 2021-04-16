const Sale = require('../models/saleModel');
const saleService = require('../services/saleService');
const statusCodes = require('../utils/statusCodes');

const getAll = async (_req, res) => {
  try {
    const results = { sales: await Sale.getAll() };
    res.status(statusCodes.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getByIdService(id);
  res.status(result.status).json(result.msg);
};

const createSale = async (req, res) => {
  try {
    const salesArr = req.body;
    const result = await saleService.createSaleService(salesArr);
    res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const result = await Sale.update(id, itensSold);
    return res.status(statusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleService.deleteSaleService(id);  
    res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
