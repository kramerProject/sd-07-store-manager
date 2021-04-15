const productModel = require('../models/productsModel');

const validation = (name, quantity) => {
  const FIVE = 5;
  const ZERO = 0;

  if (name.length < FIVE || typeof name !== 'string') {
    const ERR_MESSAGE = '\"name\" length must be at least 5 characters long';
    throw new Error(ERR_MESSAGE);
  }
  if (typeof quantity !== 'number') {
    const ERR_MESSAGE = '\"quantity" must be a number';
    throw new Error(ERR_MESSAGE);
  }
  if (quantity < ZERO || quantity === ZERO) {
    const ERR_MESSAGE = '\"quantity" must be larger than or equal to 1';
    throw new Error(ERR_MESSAGE);
  }
};

const getById = async (id) => {
  const result = await productModel.getById(id);

  if(!result) {
    const ERR_MESSAGE = 'Wrong id format';
    throw new Error(ERR_MESSAGE);
  }

  return result;
};

const add = async (name, quantity) => {
  validation(name, quantity);
  const product = await productModel.getProductByName(name);
  
  if (product) {
    const ERR_MESSAGE = 'Product already exists';
    throw new Error(ERR_MESSAGE);
  }

  return productModel.add(name, quantity);
};

const update = (id, name, quantity) => {
  validation(name, quantity);

  return productModel.update(id, name, quantity);
};

const deleteProduct = async (id) => {
  const product = await getById(id);

  return productModel.deleteProduct(product);
};

module.exports = {
  getById,
  add,
  update,
  deleteProduct
};
