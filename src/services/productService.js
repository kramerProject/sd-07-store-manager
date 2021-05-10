const { name } = require('faker');
const {
  create,
  getByName,
  getAll,
  getById,
  setById
} = require('../models/productModel');

const createNewProduct = async (name, quantity) => {
  const newProduct = await create(name, quantity);
  return newProduct;
};

const findByName = async (name) => {
  const product = await getByName(name);
  return product;
};

const findAll = async () => {
  const products = await getAll();
  return products;
};

const findById = async (id) => {
  const product = await getById(id);
  return product;
};

updateById = async (id, name, quantity) => {
  await setById(id, name, quantity);
};

module.exports = {
  createNewProduct,
  findByName,
  findAll,
  findById,
  updateById,
};
