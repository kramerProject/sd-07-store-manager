const { ObjectId } = require('mongodb');
const modelsProducts = require('../models/modelsProducts')

// rules name for insert product
const rulesNameInsProd = async (req, res, next) => {
  const { name } = req.body;
  const sixN = 6;
  if (name.length < sixN) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  const nameCheck = await modelsProducts.getByName(name);
  if (nameCheck) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  next();
}

// rules quantity for insert products
const rulesQuantInsProd = async (req, res, next) => {
  const { quantity } = req.body;
  const oneN = 1;
  // !!
  if (quantity < oneN) {
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
  next();
}

// rules id for getbyId and excludeById

module.exports = {
  rulesNameInsProd,
  rulesQuantInsProd
}
