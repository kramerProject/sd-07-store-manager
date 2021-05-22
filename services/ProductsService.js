const ProductsModel = require('../models/ProductsModel');

const ProductSchema = require('../schemas/ProductsSchema');

const getAll = async () => ProductsModel.getAll();

const create = async (name, quantity) => {

  const validate = await ProductSchema.validate(name, quantity);
  if (validate.message) return validate;

  const product = await ProductsModel.create(name, quantity);

  return ({ code: 201, product });
};

module.exports = {
  getAll,
  create,
};
