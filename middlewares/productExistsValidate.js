const productsModel = require('../models/productsModel');
const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const productExistsValidate = async (req, res, next) => {
  const { name } = req.body;
  const err = new Error();
  err.code = 'invalid_data';

  err.message = 'Product already exists';
  const nameExists = await productsModel.getByName(name);
  if (nameExists) return res.status(UNPROCESSABLE_ENTITY).json({ err });
  next();
};

module.exports = productExistsValidate;
