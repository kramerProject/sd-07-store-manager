const salesModels = require('../models/sales');

const getAll = async () => {
  const result = await salesModels.getAll();
  return result;
};
const findByid = async (id) => {
  const result= await salesModels.findByid(id);
  return result;
};

const create = async (sales) => {
  const result = await salesModels.create(sales);
  return result;
};

const deleteSales = async (id) => {
  const result = await salesModels.deleteSales(id);
  return result;
};

module.exports = {
  getAll,
  findByid,
  create,
  deleteSales,
};

