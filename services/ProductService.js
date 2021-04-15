const productModel = require('../models/ProducModel');

module.exports = {
  async create(data) {
    const product = await productModel.create(data);
    return product.ops[0];
  },
};
