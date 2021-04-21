const productsModels = require('../models/products');

const STATUS = 422;
const getAll = async () => {
  const result = await productsModels.getAll();
  return result;
};

const update  = async (id) => {
  const result= await productsModels.update(id);
  return result;
};

const create = async (name, quantity) => {
  const result = await productsModels.create(name, quantity);
  return result;
};

const findByid = async (id) => {
  const result= await productsModels.findByid(id);
  return result;
};

// const findByName = async (name) => {
//   const result = await productsModels.findByName(name);
//   return result;
// };
const productAtual = async (id, name, quantity) => {
  const result = await productsModels.productAtual(id, name, quantity);

  return result;
};

const deleteProduct = async (id) => {
  const result = await productsModels.deleteProduct(id);
  return result;
};

module.exports = {
  getAll,
  create,
  findByid,
  update,
  //findByName,
  productAtual,
  deleteProduct,
};
