const { ErrorHandler } = require('../../helpers/error');
const { StatusCodes } = require('http-status-codes');


const validatQuantity = (quantity) => {
  if(typeof quantity !== 'number' || Math.sign(quantity) !== 1) {
    throw new ErrorHandler( 
      StatusCodes.UNPROCESSABLE_ENTITY,
      'invalid_data', 
      'Wrong product ID or invalid quantity');
  }
};

const saleValidateMiddleware = (req, _res, next) => {
  const itensSold = req.body;
  try {
    itensSold.forEach(({ quantity }) => validatQuantity(quantity));
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = saleValidateMiddleware;