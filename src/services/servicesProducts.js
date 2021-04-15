const { ObjectId } = require('mongodb');
const modelsProducts = require('../models/modelsProducts');

// rules for insert products
const rulesInsProd = async (name, quantity) => {
  if (name.length < 6) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  // const nameCheck = await modelsProducts.getByName(name);
  // if (nameCheck) {
  //   throw {
  //     code: 'invalid_data',
  //     message: 'Product already exists',
  //   };
  // }
  if (quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return true;
};

const create = async (name, quantity) => {
  const rules = await rulesInsProd(name, quantity);
  if (!rules) {
    return false;
  };
  const nameCheck = await modelsProducts.getByName(name);
  if (nameCheck) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const productInserted = await modelsProducts.create(name, quantity);
  return productInserted;
};

const getAll = async () => {
  const products = await modelsProducts.getAll();
  const productsList = {
    products,
  };
  return productsList;
};

// onde passar o erro? aqui ou no controllers?
const getById = async (id) => {
  const productId = await modelsProducts.getById(id);

  if (!productId) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productId;
};

const updateById = async (id, name, quantity) => {
  const rules = await rulesInsProd(name, quantity);
  if (!rules) {
    return false;
  };

  await modelsProducts.updateById(id, name, quantity);
  return {
    _id: ObjectId(id),
    name,
    quantity,
  };
};

const excludeById = async (id) => {
  const excludedProd = await modelsProducts.excludeById(id);
  if (!excludedProd) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return excludedProd;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  excludeById
};
