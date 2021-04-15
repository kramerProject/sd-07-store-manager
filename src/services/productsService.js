const { productsModel } = require('../models');
const { create, exclude, ready, update } = productsModel;

const createProduct = async (name, quantity) => {
  const newProduct = await create(name, quantity);
  if (!newProduct) return undefined;
  return { _id: newProduct.insertedId, name, quantity };
};

const readyProducts = async () => {
  const data = await ready();
  if (!data) return undefined;
  return data;
};

module.exports = {
  createProduct,
  readyProducts,
};
