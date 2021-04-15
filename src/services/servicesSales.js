const { ObjectId } = require('mongodb');
const modelsProducts = require('../models/modelsProducts');
const modelsSales = require('../models/modelsSales');

// rules for insert sales
const rulesInsSales = async (name, quantity) => {
  if (name.length < 6) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  const nameInvalid = await modelsProducts.getByName(name);
  if (nameInvalid) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
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
