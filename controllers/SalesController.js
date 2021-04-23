const salesServices = require('../services/SalesServices');
const { SUCCESS, CREATE, UNPROCESS, NOTFOUND } = require('./Status');

const createSale = async (req, res) => {
  try {
    const result = await salesServices.createSale(req.body);
    return res.status(CREATE).json(result.message);
  } catch(error) { 
    return res.status(UNPROCESS).json(error.message);
  }
};

const getSale = async (_req, res) => {
  try {
    const list = await salesServices.getSale();
    return res.status(SUCCESS).json(list.message);
  } catch (error) {
    return res.json('Algo deu errado :(');
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSaleById(id);
    return res.status(SUCCESS).json(sale.message);
  } catch (error) {
    return res.status(NOTFOUND).json(error.message);
  }
};

const updateSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSale = await salesServices.updateSalesById(id, req.body);
    return res.status(SUCCESS).json(updateSale.message);
  } catch (error) {
    return res.status(UNPROCESS).json(error.message);
  }
};

const deleteSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSale = await salesServices.deleteSalesById(id);
    return res.status(SUCCESS).json(deleteSale.message);
  } catch (error) {
    return res.status(UNPROCESS).json(error.message);
  }
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById
};