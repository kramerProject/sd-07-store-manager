const saleModel = require('../models/saleModel');
const productUpdate = require('../services/productService');

const create = async (itensSold) => {
  const sales = await saleModel.create(itensSold);
  const [itens] = sales;
  
  itensSold.forEach((item) => productUpdate.updateProductsSales(
    item.productId, -item.quantity));

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
  const sales = await saleModel.findById(id);
  const { itensSold: itens } = sales;
  const [product] = itens; 

  itensSold.forEach((item) => productUpdate.updateProductsSales(
    item.productId, -item.quantity + product.quantity));

  await saleModel.update(id, sale.quantity, sale.productId);

  return { _id: id, itensSold };
};

const exclude = async (id) => {
  const sale = await saleModel.findById(id);
  const { itensSold } = sale;

  itensSold.forEach((item) => productUpdate.updateProductsSales(
    item.productId, item.quantity));
  
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
