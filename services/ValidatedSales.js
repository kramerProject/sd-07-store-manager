const productsModels = require('../models/ProductsModels');

const statusData = {
  invalid: 'invalid_data',
  notFound: 'not_found',
};

const message = {
  mInvalidIdQtd: {
    err: {
      code: statusData.invalid, 
      message: 'Wrong product ID or invalid quantity',
    }
  },
  mSaleNotFound: {
    err: {
      code: statusData.notFound,
      message: 'Sale not found',
    }
  },
  mInvalidFormatId: {
    err: {
      code: statusData.invalid, 
      message: 'Wrong sale ID format',
    }
  },
};

const productNotExist = async (product) => {
  const produto = await Promise.all(product.map(async (item) => {
    if(await productsModels.getProductById(item.productId)) return false;
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

module.exports = {
  message,
  productNotExist,
  invalidQuantity,
  quantityNotNumber,
};