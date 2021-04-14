const productModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const productExistMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const NUMBER_CONDITION = 24;

  if (!ObjectId.isValid(id) || id.length !== NUMBER_CONDITION)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    } });

  const idExist = await productModel.findById(id);

  if (!idExist)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    } });

  next();
};

module.exports = productExistMiddleware;
