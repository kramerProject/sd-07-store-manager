const Sales = require('../Services/Sales');

const create = async (req, res) => {
  const result = await Sales.create(req.body);
  res.status(result.code).json(result.message);
};

const getSales = async (_req, res) => {
  const list = await Sales.getSales();
  res.status(list.code).json(list.message);
};

const getBySaleId = async (req, res) => {
  const { id } = req.params;
  const sale = await Sales.getBySaleId(id);
  res.status(sale.code).json(sale.message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const updatedSale = await Sales.updateSale(id, req.body);
  res.status(updatedSale.code).json(updatedSale.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await Sales.deleteSale(id);
  res.status(deletedSale.code).json(deletedSale.message);
};

module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};