const rescue = require('express-rescue');
const service = require('../services/sale');
const { throwError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const create = rescue(async (req, res) => {
  const { body } = req;

  const createdSale = await service.createSale(body);

  res.status(status.ok).json(createdSale);
});

const getAll = rescue(async (_req, res) => {
  const sales = await service.getAllSales();
  res.status(status.ok).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const getSales = await service.getSaleById(id);

  if (!getSales) throw new throwError(status.notFound, errors.saleNotFound);

  res.status(status.ok).json(getSales);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = req.body;
  const updatedSale = await service.updateSale(id, sale);

  res.status(status.ok).json(updatedSale);
});

const deleted = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await service.deleteSale(id);

  res.status(status.ok).json(deletedSale);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleted,
};