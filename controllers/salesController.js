const saleService = require('../services/salesService');

const createSale = async (req, res) => {
  try {
    const { body } = req;
    const result = await saleService.addSale(body);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await saleService.getAll();
    res.status(result.status).json(result.sales);
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleService.getById(id);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await saleService.updateSale(id, body);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleService.deleteSale(id);
    res.status(result.status).json(result.response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};