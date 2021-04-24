const productsModels = require('../models/ProductsModels');
const validated = require('./ValidatedProduct');
const ObjectId = require('mongodb').ObjectId;

const convertId = (id) => {
  try{
    return ObjectId(id);
  } catch {
    return null;
  }
};

const createProduct = async(product, qty) => {
  switch(true) {
  case validated.productName(product): 
    throw { message: validated.message.productName };
  case await validated.productExists(product): 
    throw { message: validated.message.productExists };
  case validated.isNotNumber(qty):
    throw { message: validated.message.isNotNumber };
  case validated.minQuantity(qty):
    throw { message: validated.message.quantity };
  default:
    const result = await productsModels.createProduct(product, qty);
    const { _id, name, quantity } = result[0];
    return { message: {_id, name, quantity} };
  }
};

const getProduct = async () => {
  const response = await productsModels.getProduct();
  return { list: { products: response } };
};

const getProductById = async (id) => {
  const objectId = convertId(id);
  if(!objectId) throw { message: validated.message.invalidFormatId };
  const response = await productsModels.getProductById(objectId);
  if (response) return { message: response };
  throw { message: validated.message.invalidFormatId };
};

const updateProductsById = async (id, product, qtd) => {
  switch(true) {
  case validated.productName(product):
    throw { message: validated.message.productName };
  case validated.isNotNumber(qtd):
    throw { message: validated.message.isNotNumber };
  case validated.minQuantity(qtd):
    throw { message: validated.message.quantity };
  default:
    const objectId = convertId(id);
    if(!objectId) throw { message: validated.message.invalidFormatId };
    const result = await productsModels.updateProductsById(objectId, product, qtd);
    return { message: result.value };
  }
};

const deleteProductsById = async (id) => {
  const objectId = convertId(id);
  if(!objectId) throw { message: validated.message.invalidFormatId };
  const result = await productsModels.deleteProductsById(objectId);
  if (result) return { message: result };
  throw { message: validated.message.invalidFormatId };
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProductsById,
  deleteProductsById,
};