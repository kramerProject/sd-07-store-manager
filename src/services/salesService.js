
const {
  create,
//   getByName,
//   getAll,
//   getById,
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

// const findAll = async () => {
//   const products = await getAll();
//   return products;
// };

// const findById = async (id) => {
//   const product = await getById(id);
//   return product;
// };

// updateById = async (id, name, quantity) => {
//   await setById(id, name, quantity);
// };
// const removeById = async (id) => {
//   return await deleteById(id);
// };

module.exports = {
  createNewSale,
};
