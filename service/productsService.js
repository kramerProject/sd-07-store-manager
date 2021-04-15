const ProductModel = require('../models/productsModel');
const ProductSchema = require('../schemas/ProductSchema');

const created = 201;
const OK = 200;

const add = async (name, quantity) => {

  const validation = await ProductSchema.validatePost(name, quantity);

  if (validation.err) return validation;

  const product = await ProductModel.add(name, quantity);

  return { code: created, product };
};

const getAll = async () => {
  
  const products = await ProductModel.getAll();
  
  return { code: OK, products };
};

const getById = async (id) => {

  const validation = await ProductSchema.validateGet(id);

  if (validation.err) return validation;

  const products = await ProductModel.getById(id);
  
  return { code: OK, products };
};


const update = async (id, name, quantity) => {

  const validation = await ProductSchema.validatePut(name, quantity);

  if (validation.err) return validation;

  await ProductModel.update(id, name, quantity);

  const product = {
    _id: id,
    name,
    quantity,
  };

  return { code: OK, product };
};

const exclude = async (id) => {

  const validation = await ProductSchema.validateDelete(id);

  if (validation.err) return validation;

  const products = await ProductModel.getById(id);
  const product = await ProductModel.exclude(id);

  return { code: OK, product, products };
};
module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude
};
