const saleModel = require('./saleModel');

const add = async (itensSold) => {
  const newSale = await saleModel.add(itensSold);
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
      .filter(({ productId }) => productId === itensSold.productId);
    newItensSold[0].quantity = itensSold.quantity;
    const updatedSale = await saleModel.update(id, newItensSold);
    return updatedSale;
  }
  return null;
};

const del = async (id) => {
  const foundSale = await saleModel.findById(id);

  if (foundSale) {
    await saleModel.del(id);
    return foundSale;
  }
  
  return null;
};

module.exports = {
  add,
  findById,
  findAll,
  update,
  del,
};