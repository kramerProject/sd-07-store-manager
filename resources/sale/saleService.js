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

const update = async (id, itensSold) => {
  const foundSale = await saleModel.findById(id);
  if (foundSale) {
    const newItensSold = foundSale.itensSold
      .find(({ productId }) => productId === itensSold.productId);
    newItensSold[0].quantity = itensSold.quantity;
    const updatedSale = await saleModel.update(id, newItensSold);
    return updatedSale;
  }
  return null;
};

module.exports = {
  add,
  findById,
  findAll,
  update,
};