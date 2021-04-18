const productsModel = require('../models/productsModel');
const NAME_MIN_LENGTH = 5;
const ZERO = 0;

const createProduct = async (name, quantity) => {
  if (name.length < NAME_MIN_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }

  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }

  const nameFound = await productsModel.getByName(name);
  if (nameFound !== null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  const createdProduct = await productsModel.create(name, quantity);
  return createdProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();
  return { products: allProducts };
};

const getProductById = async (id) => {
  const productFound = await productsModel.getById(id);
  if (productFound === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
  return productFound;
};

const updateProduct = async (id, name, quantity) => {
  if (name.length < NAME_MIN_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }

  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }

  return await productsModel.update(id, name, quantity);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
};