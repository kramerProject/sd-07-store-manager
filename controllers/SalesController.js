const salesServices = require('../services/SalesServices');
const code = require('./Status');
const { statusData } = require('../services/ValidatedSales');

const createSale = async (req, res) => {
  try {
    const result = await salesServices.createSale(req.body);
    return res.status(code.SUCCESS).json(result.message);
  } catch({ message }) { 
    if(message.err.code === statusData.stockProblem) {
      return res.status(code.NOTFOUND).json(message);
    }
    return res.status(code.UNPROCESS).json(message);
  }
};

const getSale = async (_req, res) => {
  try {
    const list = await salesServices.getSale();
    return res.status(code.SUCCESS).json(list.message);
  } catch (error) {
    return res.json('Algo deu errado :(');
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSaleById(id);
    return res.status(code.SUCCESS).json(sale.message);
  } catch (error) {
    return res.status(code.NOTFOUND).json(error.message);
  }
};

const updateSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSale = await salesServices.updateSalesById(id, req.body);
    return res.status(code.SUCCESS).json(updateSale.message);
  } catch (error) {
    return res.status(code.UNPROCESS).json(error.message);
  }
};

const deleteSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSale = await salesServices.deleteSalesById(id);
    return res.status(code.SUCCESS).json(deleteSale.message);
  } catch (error) {
    return res.status(code.UNPROCESS).json(error.message);
  }
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById
};