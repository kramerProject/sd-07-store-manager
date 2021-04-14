const Sale = require('../services/saleService');

const create = async (req, res) => {
  const { body } = req;
  const { code, newSale } = await Sale.create(body);
  res.status(code).json(newSale);
};

const findAll = async (req, res) => {
  const { code, salesList } = await Sale.findAll();
  res.status(code).json({ sales: salesList });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { code, sale } = await Sale.findById(id);
  res.status(code).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  const { code, sale } = await Sale.update(id, productId, quantity);
  res.status(code).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { code, deletedCount } = await Sale.remove(id);
  res.status(code).json(deletedCount);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
