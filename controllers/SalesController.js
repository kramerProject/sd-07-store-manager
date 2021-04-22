const salesServices = require('../services/SalesServices');
const { SUCCESS, CREATE, UNPROCESS, NOTFOUND } = require('./Status');

const createSale = async (req, res) => {
  try {
    const results = await salesServices.createSale(req.body);
    res.status(CREATE).json(results.message);
  } catch(error) { 
    res.status(UNPROCESS).json(error.message);
  }
};

const getSale = async (_req, res) => {
  try {
    const sale = await salesServices.getAllSales();
    res.status(SUCCESS).json(sale.message);
  } catch (error) {
    res.status(NOTFOUND).json(error.message);
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSalesById(id);
    res.status(SUCCESS).json(sale.message);
  } catch (error) {
    res.status(NOTFOUND).json(error.message);
  }
};

const updateSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.updateSalesById(id, req.body);
    res.status(SUCCESS).json(sale.message);
  } catch (error) {
    res.status(UNPROCESS).json(error.message);
  }
};

const deleteSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.deleteSalesById(id);
    res.status(SUCCESS).json(sale.message);
  } catch (error) {
    res.status(UNPROCESS).json(error.message);
  }
};

module.exports = {
  createSale,
  getSale,
  getSalesById,
  updateSalesById,
  deleteSalesById
};