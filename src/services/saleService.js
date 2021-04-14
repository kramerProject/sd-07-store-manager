const Sale = require('../models/salesModel');

const create = async (saleItens) => {
  const { insertedId } = await Sale.create(saleItens);

  const newSale = {
    _id: insertedId,
    itensSold: saleItens
  };

  return { code: 200, newSale };
};

const findAll = async () => {
  const salesList = await Sale.findAll();
  return { code: 200, salesList };
};

const findById = async (id) => {
  const sale = await Sale.findById(id);
  return { code: 200, sale };
};

const update = async (id, productId, quantity) => {
  const sale = await Sale.update(id, productId, quantity);
  return { code: 200, sale };
};

const remove = async (id) => {
  const { deletedCount } = await Sale.remove(id);
  return { code: 200, deletedCount };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
