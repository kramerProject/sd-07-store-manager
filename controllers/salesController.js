const salesModel = require('../models/salesModel');
const { SUCCESS, NOT_FOUND } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const products = req.body;
  const newSale = await salesModel.create(products);
  return res.status(SUCCESS).json(newSale);
};

const update = async (req, res) => {
  const sale = req.body;
  const { id } = req.params;
  const updatedSale = await salesModel.update(id, sale);
  return res.status(SUCCESS).json(updatedSale);
};

const getAll = async (_req, res) => {
  const sales = await salesModel.getAll();
  return res.status(SUCCESS).json({sales});
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesModel
    .getById(id);

  if (!sale) {
    const err = new Error();
    err.code = 'not_found';
    err.message = 'Sale not found';
    return res.status(NOT_FOUND).json({err});
  }
  return res.status(SUCCESS).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const product = await salesModel.deleteSale(id);
  return res.status(SUCCESS).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale,
};

