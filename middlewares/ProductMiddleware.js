const httpStatus = require('../config/httpStatus');
const { getByName } = require('../models/ProducModel');

const numbers = {
  ZERO: 0,
  CINCO: 5,
};

const validateLengthName = (request, response) => {
  const { name } = request.body;
  if (name.length <= numbers.CINCO) {
    return response.status(httpStatus.INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
};

const validateExistsName = async (request, response) => {
  const { name } = request.body;
  const product = await getByName(name);
  if (product) {
    return response.status(httpStatus.INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });
  }
};

const validateQuantityIsGreaterZero = (request, response) => {
  const { quantity } = request.body;
  if (parseInt(quantity) <= numbers.ZERO) {
    return response.status(httpStatus.INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }
};

const validateQuantityNotIsString = (request, response) => {
  const { quantity } = request.body;
  if (isNaN(parseInt(quantity))) {
    return response.status(httpStatus.INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    });
  }
};

module.exports = {
  async createValidations(request, response, next) {
    validateLengthName(request, response);
    validateQuantityIsGreaterZero(request, response);
    validateQuantityNotIsString(request, response);
    await validateExistsName(request, response);
    next();
  },
};
