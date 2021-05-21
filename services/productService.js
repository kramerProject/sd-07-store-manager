const { productsModel } = require('../models');
const productValidate = require('./productValidate');
const NEGATIVE_ONE = -1;

const getAll = async () => ({ products: await productsModel.getAll() });

const create = async (product) => {
  const { name, quantity } = product;
  await productValidate.existsName(name);
  productValidate.name(name);
  productValidate.quantity(quantity);
  return productsModel.create(name, quantity);
};

const update = async (product) => {
  const { id, name, quantity } = product;
  productValidate.name(name);
  productValidate.quantity(quantity);
  return productsModel.update(id, name, quantity);
};

const exclude = async (id) => {
  await productValidate.id(id);
  return productsModel.exclude(id);
};

const getById = async (id) => {
  await productValidate.id(id);
  return productsModel.getById(id);
};

const updateQuantityStock = async (itens, one = NEGATIVE_ONE) => {
  await itens.forEach(async ({ _id: id, quantity }) => {
    await productsModel.quantityIncrement(id, (quantity * one));
  });
};

module.exports = { getAll, create, getById, update, exclude, updateQuantityStock };
