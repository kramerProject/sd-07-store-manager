const productsModel = require('../models/productsModel');
const nameValidate = async (req, res, next) => {
  const { name } = req.body;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = 422;

  err.message = '"name" length must be at least 5 characters long';
  if (name.length < 5) next(err);

  err.message = 'Product already exists';
  const nameExists = await productsModel.getByName(name);
  if (nameExists) next(err);
  next();
};

module.exports = nameValidate;
