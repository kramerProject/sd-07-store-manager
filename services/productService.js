const ProductModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const SUCCSESS = 201;
  const ERRO = 422;

  const nameLengthMin = 5;
  const quantityMin = 0;
  if (name.length < nameLengthMin)
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long',
        },
      },
      status: 422
    };

  if (quantity < quantityMin || quantity === quantityMin)
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1',
        },
      },
      status: 422
    };

  if (typeof quantity === 'string')
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number',
        },
      },
      status: 422
    };

  const searchProduct = await ProductModel.getProductName(name);
  if (searchProduct !== null)
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists',
        },
      },
      status: ERRO
    };

  const products = await ProductModel.createAllProducts(name, quantity);

  return {
    msg: products.ops[0], status: SUCCSESS
  };
};

module.exports = {
  createProduct,
};
