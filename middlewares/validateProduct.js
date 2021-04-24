const CustomError = require('./CustomError');
const {StatusCodes} = require('http-status-codes');


const code = 'invalid_data';

const validateProduct = async (req, _res, next) => {
  try {
    const { name, quantity } = req.body;
    const ZERO_QTD = 0;
    const MIN_LENGTH_NAME = 5;

    if (!name) throw new CustomError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      code,
      'Name not exists'
    );
    if (typeof name !== 'string')
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        '"name" must be a string'
      );
    if (name.length < MIN_LENGTH_NAME)
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        '"name" length must be at least 5 characters long'
      );

    if (quantity === undefined)
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        'Quantity not exists'
      );
    if (typeof quantity !== 'number')
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        '"quantity" must be a number'
      );
    if (quantity <= ZERO_QTD)
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        '"quantity" must be larger than or equal to 1'
      );

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = validateProduct;
