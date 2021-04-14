const salesModels = require('../models/salesModels');
const salesService = require('../services/salesService');

const STATUS200 = 200;
const STATUS500 = 500;

const addSales = async (req, res) => {
  try {
    const arraySales = req.body;
    const result = await salesService.addSales(arraySales);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const results = await salesModels.getAll();
  
    return res.status(STATUS200).json({sales: results});
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.getSaleById(id);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const arraySale = req.body;
    const result = await salesService.updateById(id, arraySale);
  
    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);

    return res.status(result.code).json(result.response);
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

module.exports = {
  addSales,
  getAll,
  getSaleById,
  updateById,
  deleteSale,
};
