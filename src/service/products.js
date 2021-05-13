const {insert,
  findProduct,
  getAllProducts,
  getAllById,
  updateByID,
  deletedById,
  addNewSale,
  allSale,
  getsalById
} = require('../models/ModelProducts');

const insertProductOnDB = async (name, quantity) => {
  return await insert(name, quantity);
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
const getSaById = async(id) => {
  const result = await getsalById(id);
  return result;
};

const updatedById = async(id, name, quantity) => {
  const result = await updateByID(id, name, quantity);
  return result;
};

const deleteById = async(id) => {
  const result = await deletedById(id);
  return result;
};

const insertSale = async(arraySale) => {
  const createdSale = await addNewSale(arraySale);
  return createdSale;
};

const getAllSales = async() => {
  return await allSale();
};
module.exports = {
  insertProductOnDB, 
  findByEqual,
  getAll,
  getById,
  updatedById,
  deleteById,
  insertSale,
  getAllSales,
  getSaById
};