const saleModel = require('./saleModel');

const add = async (itensSold) => {
  // console.log('SERVICE itensSold: ', itensSold);
  const newSale = await saleModel.add(itensSold);
  // console.log('SERVICE newSale: ', newSale);
  return newSale;
};

const findById = async (id) => {
  const foundSale = await saleModel.findById(id);
  return foundSale;
};

const findAll = async () => {
  const allSales = await saleModel.findAll();
  return { sales: allSales };
};

module.exports = {
  add,
  findById,
  findAll,
};