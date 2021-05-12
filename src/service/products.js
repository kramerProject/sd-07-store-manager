const {insert, findProduct, getAllProducts,
  getAllById} = require('../models/ModelProducts');

const insertProductOnDB = (name, quantity) => {
  const insertProducts =  insert(name, quantity);
  return insertProducts;
};

const findByEqual = async (name) => {
  const equalName =  await findProduct(name);
  const exists = equalName.find(product => product.name === name);
  return exists;
};

const getAll = async () => {
  const result = await getAllProducts();
  return result;
};

const getById = async(id) => {
  const result = await getAllById(id);
  return result;
};
module.exports = {
  insertProductOnDB, 
  findByEqual,
  getAll,
  getById
};