const salesModel = require('../models/salesModel');
// const validName = require('../middlewares/validName');
const status = require('./status');

const getAll = async (_req, res) => {
  const result = await salesModel.getAllSales();
  const formatedResult = { products: [...result] };
  // console.log(formatedResult);
  return res.status(status.SUCCESS).send(formatedResult);
};

const create = async (req, res) => {
  const products = req.body;
  const result = await salesModel.createSale(products);
  return res.status(status.SUCCESS).json(result);
};

module.exports = {
  getAll,
  create,
};
