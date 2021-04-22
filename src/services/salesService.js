const { SalesModel } = require('../models');

const {
  validQuantityAndType,
  existID
} = require('../validations/saleValidation');

const add = async (listSale) => {
  const validation = listSale.map((sale) => validQuantityAndType(sale.quantity));
  const sale = await SalesModel.add(listSale);

  return sale;
};

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getByID = async (id) => {
  const sale = await existID(id);
  return sale;
};

const update = async (id, itemSold) => {
  const { quantity } = itemSold[0];
  await existID(id);
  validQuantityAndType(quantity);

  const updatedSale = await SalesModel.updateByID(id, itemSold);
  return updatedSale;
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
