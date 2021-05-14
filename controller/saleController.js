const modelSales = require('../models/salesModel');
const validationSales = require('../services/saleService');

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const insertSale = async (req, res) => {
  try {
    const arrayOfSales = req.body;
    const result = await validationSales.insertSale(arrayOfSales);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_req, res) => {
  try {
    const results = await modelSales.findAll();

    return res.status(OK).json({sales: results});
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await validationSales.findSaleById(id);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const arrayOfSales = req.body;
    const result = await validationSales.updateSaleById(id, arrayOfSales);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await validationSales.deleteSale(id);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  insertSale,
  findAll,
  findSaleById,
  updateSaleById,
  deleteSale,
};

