
const {
  create,
  getAll,
  getById,
  deleteById,
//   getByName,
//   setById,
} = require('../models/salesModel');

const createNewSale = async (products) => {
  const newSale = await create(products);
  return newSale;
};

const findAll = async () => {
  const sales = await getAll();
  return sales;
};

const findById = async (id) => {
  const sales = await getById(id);
  return sales;
};

const removeById = async (id) => {
  return await deleteById(id);
};
// updateById = async (id, name, quantity) => {
//   await setById(id, name, quantity);
// };

module.exports = {
  createNewSale,
  findAll,
  findById,
  removeById,
};
