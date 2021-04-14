const saleModel = require('./saleModel');

const add = async (itensSold) => {
  // console.log('SERVICE itensSold: ', itensSold);
  const newSale = await saleModel.add(itensSold);
  // console.log('SERVICE newSale: ', newSale);
  return newSale;
};

module.exports = {
  add,
};