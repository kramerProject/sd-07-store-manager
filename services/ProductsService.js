const ProductsModel = require('../models/ProductsModel');

const ProductSchema = require('../schemas/ProductsSchema');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return ({products: products});
};

const findById = async (id) => {
  const validate = ProductSchema.validateId(id);
  if (validate) return({ code: 'invalid_data', message: 'Wrong id format'});

  const product = await ProductsModel.findById(id);
  if (!product) return({ code: 'invalid_data', message: 'Wrong id format'});

  return ({ product });
};

const create = async (name, quantity) => {

  const validate = ProductSchema.validateNameQuantity(name, quantity);
  if (validate.message) return validate;

  const validateNameExist = await ProductSchema.nameExist(name);
  if (validateNameExist.message) return validateNameExist;

  const product = await ProductsModel.create(name, quantity);

  return ({ product });
};

const updateById = async (id, name, quantity) => {
  const validateNameQty = await ProductSchema.validateNameQuantity(name, quantity);
  if (validateNameQty.message) return validateNameQty;

  const validId = ProductSchema.validateId(id);
  if (validId) return({ code: 'invalid_data', message: 'Wrong id format'});

  const product = await ProductsModel.updateById(id, name, quantity);
  return ({ product });
};

module.exports = {
  getAll,
  create,
  findById,
  updateById,
};
