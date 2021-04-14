const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');
const okStatus = 200;
const notFounStatus = 404;

const createSale = async (req, res) => {
  try {
    const saleArray = req.body;
    const newSale = await salesService.createSale(saleArray);

    res.status(okStatus).json(newSale);
  } catch (err) {
    throw new Error(err);
  }
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    
    res.status(okStatus).json({sales});
  } catch (err) {
    throw new Error(err);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.getSaleById(id);

    if(saleById.err) return res.status(notFounStatus).json(saleById);

    res.status(okStatus).json(saleById);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById
};
