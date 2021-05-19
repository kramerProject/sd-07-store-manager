const { salesModel } = require('../models');
const salesValidate = require('./salesValidate');

const getAll = async () => ({ sales: await salesModel.getAll() });

const create = async (itensSold) => {
  salesValidate.quantity(itensSold);
  return salesModel.create(itensSold);
};

module.exports = { getAll, create };
