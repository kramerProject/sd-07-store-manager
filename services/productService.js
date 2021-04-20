const ProductModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const SUCCSESS = 201;
  const UNPROCESSABLE_ENTITY = 422;

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
      status: UNPROCESSABLE_ENTITY
    };

  if (quantity < quantityMin || quantity === quantityMin)
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };

  if (typeof quantity === 'string')
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number',
        },
      },
      status: UNPROCESSABLE_ENTITY
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
      status: UNPROCESSABLE_ENTITY
    };

  const products = await ProductModel.createAllProducts(name, quantity);

  return {
    msg: products.ops[0], status: SUCCSESS
  };
};

const getAll = async () => ProductModel.getAll();

const getProductById = async (id) => {
  const UNPROCESSABLE_ENTITY = 422;
  const result = await ProductModel.productId(id);
  // console.log(result);
  if (result === null) {
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong id format',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };
  }
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const SUCCSESS_OK = 200;
  const UNPROCESSABLE_ENTITY = 422;

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
      status: UNPROCESSABLE_ENTITY
    };

  if (quantity < quantityMin || quantity === quantityMin)
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };

  if (typeof quantity === 'string')
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number',
        },
      },
      status: UNPROCESSABLE_ENTITY
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
      status: UNPROCESSABLE_ENTITY
    };

  // await ProductModel.updateProduct(id, name, quantity);

  return {
    msg: { id, name, quantity }, status: SUCCSESS_OK
  };
};

const deleteProduct = async (id) => {
  const SUCCSESS_OK = 200;
  const UNPROCESSABLE_ENTITY = 422;
  const product = await ProductModel.deleteProduct(id);

  if (!product) {
    return {
      msg: {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong id format',
        },
      },
      status: UNPROCESSABLE_ENTITY
    };
  }
  return {
    msg: product, status: SUCCSESS_OK
  };
};

module.exports = {
  createProduct,
  getAll,
  getProductById,
  updateProduct,
  deleteProduct
};
