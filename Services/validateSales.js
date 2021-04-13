const Products = require('../Models/Products');

const codes = {
  invalid: 'invalid_data',
  notFound: 'not_found',
};

const message = {
  invalidIdOrQty: {
    err: {
      code: codes.invalid, 
      message: 'Wrong product ID or invalid quantity',
    }
  },
  saleNotFound: {
    err: {
      code: codes.notFound, 
      message: 'Sale not found',
    }
  },
  wrongIdFormat: {
    err: {
      code: codes.invalid, 
      message: 'Wrong sale ID format',
    }
  },
};

const productDoesntExists = async (product) => {
  const produto = await Promise.all(product.map(async (item) => {
    if(await Products.getByProductId(item.productId)) return false;
    return true;
  }));
  return produto.some(item => item === true);
};

const saleQuantityInvalid = (product) => {
  const validArray = product.map(item => {
    if(item.quantity < 1) return true;
    return false;
  });
  return validArray.some(item => item === true);
};

const quantityIsntNumber = (product) => {
  const validArray = product.map(item => {
    if(typeof(item.quantity) !== 'number') return true;
    return false;
  });
  return validArray.some(item => item === true);
};

module.exports = {
  productDoesntExists,
  saleQuantityInvalid,
  quantityIsntNumber,
  message,
};