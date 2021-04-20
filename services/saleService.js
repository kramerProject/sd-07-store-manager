const model = require('../models/saleModel');

const createNewSale = async (sales) => {
  const {insertedId, ops } = await model.createNewSale(sales);
  const {itensSold} = ops[0];

  return {
    _id: insertedId,
    itensSold
  };
};

/*
const searchProduct = async (name) => await model.searchProduct(name);

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  const objectArrayProducts = {products: [...products]};
  return objectArrayProducts;
};

const findByProductId = async (id) => await model.findByProductId(id);

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

};
