const model = require('../models/saleModel');

const createNewSale = async (sales) => {
  const {insertedId, ops } = await model.createNewSale(sales);
  const {itensSold} = ops[0];

  return {
    _id: insertedId,
    itensSold
  };
};

const getAllSales = async () => {
  const sales = await model.getAllSales();
  const objectArraySales = {sales: [...sales]};
  return objectArraySales;
};

const findBySaleId = async (id) => await model.findBySaleId(id);

const updateSale = async (id, sale) => await model.updateSale(id, sale);


/*

const searchProduct = async (name) => await model.searchProduct(name);

const updateProduct = async (id, nameProduct, quantityProduct) =>
  await model.updateProduct(id, nameProduct, quantityProduct);

const deleteProduct = async (id) => {
  const {name, quantity} = await model.findByProductId(id);
  await model.deleteProduct(id);
  return {
    _id: id,
    name,
    quantity
  };
};
*/

module.exports = {
  createNewSale,
  getAllSales,
  findBySaleId,
  updateSale,
};
