const { name } = require('faker');
const {
  create,
  getByName,
  getAll,
  getById,
  setById,
  deleteById,
} = require('../models/productModel');

const createNewProduct = async (name, quantity) => {
  const newProduct = await create(name, quantity);
  return newProduct;
};

const findByName = async (name) => {
  const product = await getByName(name);
  console.log(product);
  return product;
};

const findAll = async () => {
  const products = await getAll();
  return products;
};

const findById = (id) => {
  const product =  getById(id);
  return product;
};

updateById = async (id, name, quantity) => {
  await setById(id, name, quantity);
};
const removeById = async (id) => {
  return await deleteById(id);
};

module.exports = {
  createNewProduct,
  findByName,
  findAll,
  findById,
  updateById,
  removeById,
};
