const salesService = require('../services/salesService');
const rescue = require('express-rescue');

const createdStatus = 201;
const okStatus = 200;

const addNewSale = rescue(async (req, res) => {
  const listSale = req.body;
  const newSale = await salesService.add(listSale);
  res.status(okStatus).json(newSale);
});

const getAllsales = rescue(async (req, res) => {
  const sales = await salesService.getAll();
  res.status(okStatus).json({sales: sales});
});

const getByID = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getByID(id);
  res.status(okStatus).json(result);
});

const updateByID = rescue(async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  const itemSold = req.body;
  const updatedSales = await salesService.update(id, itemSold);

  res.status(okStatus).json(updatedSales);
});

module.exports = {
  addNewSale,
  getAllsales,
  getByID,
  updateByID,
};
