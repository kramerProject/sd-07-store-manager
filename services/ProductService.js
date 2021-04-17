const productModel = require('../models/ProducModel');

module.exports = {
  async create(data) {
    const product = await productModel.create(data);
    return product.ops[0];
  },
  async getAll() {
    const products = await productModel.getAll();
    return products.toArray();
  },
  async getById(id) {
    return await productModel.getById(id);
  }
};
