const ProductModel = require('../models/ProductModel');

module.exports = {
  create: async (name, quantity) => {
    return await ProductModel.create(name, quantity);
  },
  find: async (field, value) => {
    return await ProductModel.find(field, value);
  },
};
