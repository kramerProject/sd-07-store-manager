const productsModel = require('../models/productsModel');
const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const productExistsValidate = async (req, res, next) => {
  const { name } = req.body;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = UNPROCESSABLE_ENTITY;

  err.message = 'Product already exists';
  const nameExists = await productsModel.getByName(name);
  if (nameExists) next(err);
  next();
};

module.exports = productExistsValidate;
