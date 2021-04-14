const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');

const OK = 200;
const notFound = 404;
const serverError = 500;

const wrongId = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const createSales = async (req, res) => {
  try {
    const sales = await salesServices.createSales(req.body);
    const { http, message } = sales;
    return res.status(http).json(message);
  } catch (error) {
    console.error(error);
    return res.status(serverError).json({ message: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const results = await salesModel.getAllSales();
    return res.status(OK).send({sales: results});
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await salesModel.getSaleById(id);

    if(!results) {
      return res.status(notFound).json(wrongId);
    }

    return res.status(OK).json(results);
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.updateSale(id, req.body);
    const { http, message } = sale;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale
};