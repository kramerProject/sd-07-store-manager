const Products = require('../Models/Products');
const invalid = require('./validateProduct');

const create = async (product, qty) => {
  switch (true) {
  case invalid.productName(product):
    throw { message: invalid.message.productName };
  case await invalid.productExists(product):
    throw { message: invalid.message.productExists };
  case invalid.isntNumber(qty):
    throw { message: invalid.message.quantityNotNumber };
  case invalid.minQuantity(qty):
    throw { message: invalid.message.quantity };
  default:
    const result = await Products.create(product, qty);
    const { _id, name, quantity } = result[0];
    return { message: { _id, name, quantity} };
  }
};

const getProduct = async () => {
  const response = await Products.getProduct();
  return { list: { products: response }};
};

const getByProductId = async (id) => {
  const response = await Products.getByProductId(id);
  if(response) return { message: response };
  throw { message: invalid.message.wrongId };
};

const updateByProductId = async (id, product, qty) => {
  switch (true) {
  case invalid.productName(product):
    throw { message: invalid.message.productName };
  case invalid.isntNumber(qty):
    throw { message: invalid.message.quantityNotNumber };
  case invalid.minQuantity(qty):
    throw { message: invalid.message.quantity };
  default:
    const result = await Products.updateByProductId(id, product, qty);
    return { message: result.value };
  }
};

const deleteByProductId = async (id) => {
  const result = await Products.deleteByProductId(id);
  if(result) return { message: result};
  throw {message: invalid.message.wrongId};
};

module.exports = {
  create,
  getProduct,
  getByProductId,
  updateByProductId,
  deleteByProductId,
};