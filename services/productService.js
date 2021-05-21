const { productsModel } = require('../models');
const productValidate = require('./productValidate');
const  NEGATIVE_ONE = -1;
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
  const promises = await itens
    .map( async ({ productId, quantity }) => {
      console.log(productId, quantity);
      return productsModel.quantityIncrement(productId, (quantity * one));
    });
  Promise.all(promises);
};

module.exports = { getAll, create, getById, update, exclude, updateQuantityStock };
