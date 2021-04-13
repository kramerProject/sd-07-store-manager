const Products = require('../Models/Products');
const invalid = require('./validateProduct');

const status = {
  ok: 200,
  created: 201,
  unprocessableEntity: 422
};

const create = async (product, qty) => {
  try {
    switch (true) {
    case invalid.productName(product):
      return {code: status.unprocessableEntity, message: invalid.message.productName};
    case await invalid.productExists(product):
      return {code: status.unprocessableEntity, message: invalid.message.productExists};
    case invalid.isntNumber(qty):
      return {code: status.unprocessableEntity, 
        message: invalid.message.quantityNotNumber};
    case invalid.minQuantity(qty):
      return {code: status.unprocessableEntity, message: invalid.message.quantity};
    default:
      const result = await Products.create(product, qty);
      const { _id, name, quantity } = result[0];
      return {code: status.created, message: { _id, name, quantity}};
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getProduct = async () => {
  try {
    const response = await Products.getProduct();
    return {code: status.ok, list: { products: response}};
  } catch (error) {
    console.error(error.message);
  }
};

const getByProductId = async (id) => {
  try {
    const response = await Products.getByProductId(id);
    if(response) return {code: status.ok, message: response};
    return {code: status.unprocessableEntity, message: invalid.message.wrongId};
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  create,
  getProduct,
  getByProductId,
};