const SaleModel = require('../models/SaleModel');

const create = async (sales) => {
  return await SaleModel.create(sales);
};

module.exports = {
  create,
};
