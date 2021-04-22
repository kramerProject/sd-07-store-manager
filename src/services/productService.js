const products = require('../models/productModel');

const getAll = async () => {
  const result = await products.getAll();
  return result;
};

const createProduct = async (name, quantity) => {
  const result = await products.createProduct(name, quantity);
  if (!result)
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };

  return result;
};

const getById = async (id) => {
  const result = await products.getById(id);
  if (!result)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await products.updateProduct(id, name, quantity);
  if (!result)
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  return result;
};

const deleteProduct = async (id) => {
  const result = await products.deleteProduct(id);
  if (!result)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  return result;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
