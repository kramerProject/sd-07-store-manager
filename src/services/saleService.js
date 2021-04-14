const saleModel = require('../models/saleModel');

const create = async (itensSold) => {
  const sales = await saleModel.create(itensSold);
  const [itens] = sales;

  return { _id: itens._id, itensSold: itens.itensSold };
};

const findAll = async () => {
  return {
    sales: await saleModel.findAll(),
  };
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);

  return sale;
};

const update = async (id, itensSold) => {
  const [sale] = itensSold;

  await saleModel.update(id, sale.quantity, sale.productId);

  return { _id: id, itensSold };
};

const exclude = async (id) => {
  const sale = await saleModel.findById(id);
  await saleModel.exclude(id);

  return sale;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
