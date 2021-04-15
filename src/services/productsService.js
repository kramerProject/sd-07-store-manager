const { productsModel } = require('../models');
const { create, exclude, read, update, readById } = productsModel;

const createProduct = async (name, quantity) => {
  const newProduct = await create(name, quantity);
  if (!newProduct) return undefined;
  return { _id: newProduct.insertedId, name, quantity };
};

const readProducts = async () => {
  const data = await read();
  if (!data) return undefined;
  return data;
};

const readProductsById = async (id) => {
  const product = await readById(id);
  if (!product) return undefined;
  return product;
};

const updateProductById = async (id, name, quantity) => {
  const newProduct = await update(id, name, quantity);
  if (!newProduct) return undefined;
  return { _id: newProduct.insertedId, name, quantity };
};

const deleteProductById = async (id) => {
  const readProduct = await readProductsById(id);
  const productDeleted = await exclude(id);
  if (!productDeleted) return undefined;
  return readProduct;
};

module.exports = {
  createProduct,
  readProducts,
  readProductsById,
  updateProductById,
  deleteProductById,
};
