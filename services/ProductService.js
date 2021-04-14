const Product = require('../models/Product');

const getAll = async () => {
  return await Product.getAll();
};

module.exports = {
  getAll,
};