const Product = require('../models/Product');

const getAll = async () => {
  return await Product.getAll();
};

const create = async (name, quantity) => {
  return await Product.create(name, quantity);
};

module.exports = {
  getAll,
  create
};