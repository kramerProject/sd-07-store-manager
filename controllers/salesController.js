const salesServices = require('../services/salesServices');
const status = require('../config/statusTable');

const addSales = async (req, res) => {
  try {
    const sales = req.body;
    const itensSold = await salesServices.addWithValidation(sales);
    if (!itensSold.code) {
      res.status(status.get).json(itensSold);
      return;
    }
    res.status(status.invalid_data).json({err: itensSold});
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await salesServices.getAllWithValidation();
    res.status(status.get).json({ sales });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addSales,
  getAllSales,
};
