const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');
const okStatus = 200;
const notFounStatus = 404;
const unprocessableEntityStatus = 422;

const createSale = async (req, res) => {
  try {
    const saleArray = req.body;
    const newSale = await salesService.createSale(saleArray);

    return res.status(okStatus).json(newSale);
  } catch (err) {
    throw new Error(err);
  }
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    
    return res.status(okStatus).json({sales});
  } catch (err) {
    throw new Error(err);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.getSaleById(id);

    if(saleById.err) return res.status(notFounStatus).json(saleById);

    return res.status(okStatus).json(saleById);
  } catch (err) {
    throw new Error(err);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const saleArray = req.body;
    const updatedSale = await salesModel.updateSale(id, saleArray);

    return res.status(okStatus).json(updatedSale);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesService.deleteSale(id);

    if(deletedSale.err) {
      return res.status(unprocessableEntityStatus).json(deletedSale);
    };

    return res.status(okStatus).json(deletedSale);
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};
