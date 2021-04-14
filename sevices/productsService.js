const ProductsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const NAME_MIN_LENGTH = 5;
const PRODUCT_MIN_QNT = 0;
const validNameLength = (name) => {
  if (name.length < NAME_MIN_LENGTH) throw({
    'code': 'invalid_data',
    'message': '"name" length must be at least 5 characters long'

  });
};

const validateExistProduct = async (name) => {
  const checkProduct = await ProductsModel.findByName(name);

  if(checkProduct) throw({
    'code': 'invalid_data',
    'message': 'Product already exists',
  });
};

const validQuantity = (quantity) => {
  if(quantity <= PRODUCT_MIN_QNT) throw ({
    'code': 'invalid_data',
    'message': '"quantity" must be larger than or equal to 1',
  });
  if(typeof quantity !== 'number') throw ({
    'code': 'invalid_data',
    'message': '"quantity" must be a number',
  });
};

const validId = async (id) => {
  const validIdProduct = await ProductsModel.findProductById(id);
  if (!validIdProduct) {
    throw({
      'code': 'invalid_data',
      'message': 'Wrong id format',
    });
  } else {
    return validIdProduct;
  }
};

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

const findProductById = async (id) => {
  const product = await validId(id);
  return product;
};

const create = async (name, quantity) => {
  validNameLength(name);
  await validateExistProduct(name);
  validQuantity(quantity);
  const product = await ProductsModel.create(name, quantity);
  return product;
};

const update = async (id, name, quantity) => {
  await validId(id);
  validNameLength(name);
  validQuantity(quantity);
  const product = await ProductsModel.update(id, name, quantity);
  return product;
};

module.exports = { create,
  update,
  findProductById,
  getAllProducts };
