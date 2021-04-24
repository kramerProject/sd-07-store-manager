const CustomError = require('./CustomError');
const { getById } = require('../models/productsModel');
const {StatusCodes} = require('http-status-codes');


const code = 'invalid_data';
const validateId = async (req, _res, next) => {
  try {
    const { id } = req.params;
    const LENGTH = 24;
    const product = await getById(id);

    if (!id) throw new CustomError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      code,
      '"id" not exists'
    );

    if (id.length !== LENGTH || !product) {
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        code,
        'Wrong id format');
    }
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = validateId;
