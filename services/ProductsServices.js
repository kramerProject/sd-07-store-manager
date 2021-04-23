const productsModels = require('../models/ProductsModels');
const { messages: 
  { mProductExists, mProductName, mQuantity, mIsNotNumber, mInvalidFormatId },
productName, productExists, isNotNumber, minQuantity
} = require('./ValidatedProduct');

const createProduct = async(product, qty) => {
  switch(true) {
  case productName(product): throw { message: mProductName };
  case await productExists(product): throw { message: mProductExists };
  case isNotNumber(qty): throw { message: mIsNotNumber };
  case minQuantity(qty): throw { message: mQuantity };
  default:
    const result = await productsModels.createProduct(product, qty);
    const { _id, name, quantity } = result[0];
    return { message: {_id, name, quantity} };
  }
};

const getProduct = async () => {
  const result = await productsModels.getProduct();
  return { list: { products: result } };
};

const getProductsById = async (id) => {
  const response = await productsModels.getProductsById(id);
  response ? { message: response } : { message: mInvalidFormatId };
};

const updateProductsById = async (id, product, qtd) => {
  switch(true) {
  case productName(product): throw { message: mProductName };
  case isNotNumber(qtd): throw { message: mIsNotNumber };
  case minQuantity(qtd): throw { message: mQuantity };
  default:
    const result = await productsModels.updateProductsById(id, product, qtd);
    return { message: result.value };
  }
};

const deleteProductsById = async (id) => {
  const result = await productsModels.deleteProductsById(id);
  result ? { message: result } : { message: mInvalidFormatId };
};

module.exports = {
  createProduct,
  getProduct,
  getProductsById,
  updateProductsById,
  deleteProductsById,
};