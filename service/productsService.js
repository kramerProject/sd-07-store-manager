const ProductModel = require('../models/productsModel');
const ProductSchema = require('../schemas/ProductSchema');

const created = 201;




const add = async (name, quantity ) => {

  const validation = await ProductSchema.validate(name, quantity);

  if (validation.err) return validation;

  const product = await ProductModel.add(name, quantity);

  return { code: created, product };
};

module.exports = {
  // getAll,
  // getById,
  add,
  // update,
  // exclude
};