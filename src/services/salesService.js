
const {
  create,
  getAll,
  getById,
//   getByName,
//   setById,
//   deleteById,
} = require('../models/salesModel');

const createNewSale = async (products) => {
  const newSale = await create(products);
  return newSale;
};

// const findByName = async (name) => {
//   const product = await getByName(name);
//   console.log(product);
//   return product;
// };

const findAll = async () => {
  const sales = await getAll();
  return sales;
};

const findById = async (id) => {
  const sales = await getById(id);
  return sales;
};

// updateById = async (id, name, quantity) => {
//   await setById(id, name, quantity);
// };
// const removeById = async (id) => {
//   return await deleteById(id);
// };

module.exports = {
  createNewSale,
  findAll,
  findById,
};
