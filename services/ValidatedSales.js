const productsModels = require('../models/ProductsModels');
const ObjectId = require('mongodb').ObjectId;

const convertId = (id) => {
  try{
    return ObjectId(id);
  } catch {
    return null;
  }
};

const statusData = {
  invalid: 'invalid_data',
  notFound: 'not_found',
  stockProblem: 'stock_problem',
};

const message = {
  invalidIdQtd: {
    err: {
      code: statusData.invalid, 
      message: 'Wrong product ID or invalid quantity',
    }
  },
  saleNotFound: {
    err: {
      code: statusData.notFound,
      message: 'Sale not found',
    }
  },
  invalidFormatId: {
    err: {
      code: statusData.invalid, 
      message: 'Wrong sale ID format',
    }
  },
  notInStock: {
    err: {
      code: statusData.stockProblem,
      message: 'Such amount is not permitted to sell',
    }
  }
};

const productNotExist = async (product) => {
  const produto = await Promise.all(product.map(async (item) => {
    const objectId = convertId(item.productId);
    if(!objectId) return true;
    if(await productsModels.getProductById(objectId)) return false;
    return true;
  }));
  return produto.some(item => item === true);
};

const invalidQuantity = (product) => {
  const validatedProducts = product.map(item => {
    if(item.quantity < 1) return true;
    return false;
  });
  return validatedProducts.some(item => item === true);
};

const quantityNotNumber = (product) => {
  const validatedProducts = product.map(item => {
    if(typeof(item.quantity) !== 'number') return true;
    return false;
  });
  return validatedProducts.some(item => item === true);
};

const isInStock = async (product) => {
  const ZERO = 0;
  const produto = await Promise.all(product.map(async (item) => {
    const inStock = await productsModels.getProductById(convertId(item.productId));
    return inStock.quantity - item.quantity < ZERO;
  }));
  return produto.some(item => item === true);
};

module.exports = {
  message,
  productNotExist,
  invalidQuantity,
  quantityNotNumber,
  isInStock,
  statusData,
};