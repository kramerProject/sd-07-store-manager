const { ObjectId } = require('mongodb');
const modelsProducts = require('../models/modelsProducts');
// const { rulesNameInsProd, rulesQuantInsProd } = require('../middlewares/middlewaresProducts');

// rules for insert products
const rulesInsProd = async (name, quantity) => {
  const sixN = 6;
  if (name.length < sixN) {
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

// const create = (rulesNameInsProd, rulesQuantInsProd, async (name, quantity) => {
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
// });

const getAll = async () => {
  const products = await modelsProducts.getAll();
  const productsList = {
    products,
  };
  return productsList;
};

const getById = async (id) => {
  // validacao por id

  if (!ObjectId.isValid(id)) {
    // console.log('servicegetById-IF01');
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const productId = await modelsProducts.getById(id);
  // console.log('servicegetById');
  if (!productId) {
    // console.log('servicegetById-IF02');
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productId;
};

const updateById = async (id, name, quantity) => {
  // validacao por id
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
  // validacao por id
  if (!ObjectId.isValid(id)) {
    // console.log('servicegetById-IF01');
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const excludedProd = await modelsProducts.excludeById(id);
  // console.log('serviceexcludeById');
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
