const { saleModel } = require('../models');
const status = require('../status');

const addSale = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await saleModel.add(sale);
    res.status(status.OK).json(newSale);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAll();
    res.status(status.OK).send(sales);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  addSale,
  getAllSales
};