const { ErrorHandler } = require('../../helpers/error');
const { StatusCodes } = require('http-status-codes');

const NAME_MIN_LENGTH = 5; 

const validateName = (name) => {
  if (name.length < NAME_MIN_LENGTH) {
    throw new ErrorHandler(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'invalid_data', 
      '"name" length must be at least 5 characters long');
  }
};

const validatQuantity = (quantity) => {
  if(typeof quantity !== 'number') {
    throw new ErrorHandler( 
      StatusCodes.UNPROCESSABLE_ENTITY,
      'invalid_data', 
      '"quantity" must be a number');
  }

  if (Math.sign(quantity) !== 1) {
    throw new ErrorHandler(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'invalid_data', 
      '"quantity" must be larger than or equal to 1');
  }
};

const productValidateMiddleware = (req, _res, next) => {
  const { name, quantity } = req.body;
  try {
    validateName(name);
    validatQuantity(quantity);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = productValidateMiddleware;