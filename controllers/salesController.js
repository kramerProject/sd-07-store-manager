const salesServices = require('../services/salesServices');
const status = require('../config/statusTable');

const addSales = async (req, res) => {
  try {
    const sales = req.body;
    const itensSold = await salesServices.addWithValidation(sales);
    if (!itensSold.code) {
      res.status(status.get).json(itensSold);
      return;
    } else if (itensSold.code === 'stock_problem') {
      res.status(status.notFound).json({ err: itensSold });
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

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getOneSaleWithValidation(id);
    if (!sale.code) {
      res.status(status.get).json(sale);
      return;
    }
    res.status(status.notFound).json({ err: sale });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const updateSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const updatedSale = await salesServices.updateOneWithValidation(id, itensSold);
    if (!updatedSale.code) {
      res.status(status.get).json(updatedSale);
      return;
    }
    res.status(status.invalid_data).json({ err: updatedSale });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const excludeSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const excludedSale = await salesServices.excludeWithValidation(id);
    if (!excludedSale.code) {
      res.status(status.get).json(excludedSale);
      return;
    }
    res.status(status.invalid_data).json({ err: excludedSale });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  excludeSaleById,
};
