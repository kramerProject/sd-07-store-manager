const httpStatus = require('../config/httpStatus');
const { getByName, getById } = require('../models/ProducModel');
const { ObjectId } = require('mongodb');

const numbers = {
  ZERO: 0,
  CINCO: 5,
  VINTE_QUATRO: 24,
};

module.exports = {
  validateLengthName(request, response, next) {
    const { name } = request.body;
    if (name.length <= numbers.CINCO) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      });
    } else {
      next();
    }
  },
  async validateExistsName(request, response, next) {
    const { name } = request.body;
    const product = await getByName(name);
    if (product) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      });
    } else {
      next();
    }
  },
  validateQuantityIsGreaterZero(request, response, next) {
    const { quantity } = request.body;
    if (parseInt(quantity) <= numbers.ZERO) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      });
    } else {
      next();
    }
  },
  validateQuantityNotIsString(request, response, next) {
    const { quantity } = request.body;
    if (isNaN(parseInt(quantity))) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      });
    } else {
      next();
    }
  },
  async validateExistsId(request, response, next) {
    const { id } = request.params;
    if (!ObjectId.isValid(id) || id.length !== numbers.VINTE_QUATRO) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    const product = await getById(id);
    if (!product) {
      return response.status(httpStatus.INVALID_DATA).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }

    next();
  },
};
