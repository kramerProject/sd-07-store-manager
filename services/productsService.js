const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('./validations');

const newObjectError = {
  status: CODES.UNPROCESSABLE_ENTITY,
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const createNewProduct = async (name, quantity) => {
  const { error } = Validations.isProductDataValid({ name, quantity });
  if (error) {
    throw { ...newObjectError, err: { ...newObjectError.err, message: error.message } };
  }

  if (await Validations.isProductNameExists(name)) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: 'Product already exists' }
    };
  }

  const newProduct = await Models.createNewProduct(name, quantity);
  return newProduct.ops[0];
};

const getAllProducts = async () => {
  return { products: await Models.getAllProducts() };
};

const getProductById = async (id) => {
  if (!Validations.isIdValid(id)) throw newObjectError;
  const product = await Models.getProductById(id);
  if (!product) throw newObjectError;

  return product;
};

const updateProductById = async (id, name, quantity) => {
  if (!Validations.isIdValid(id)) throw newObjectError;

  const { error } = Validations.isProductDataValid({ name, quantity });
  if (error) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: error.message }
    };
  }

  if (await Validations.isProductNameExists(name)) {
    throw {
      ...newObjectError,
      err: { ...newObjectError.err, message: 'Product already exists' }
    };
  }

  const product = await Models.updateProductById(id, name, quantity);
  if (!product) throw newObjectError;

  return product;
};

const deleteProductById = async (id) => {
  if (!Validations.isIdValid(id)) throw newObjectError;
  const product = await Models.deleteProductById(id);
  if (!product) throw newObjectError;

  return product;
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
