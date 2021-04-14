const saleModel = require('../models/saleModel');
const { ObjectId } = require('mongodb');

const saleIdExistMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const NUMBER_CONDITION = 24;

  if (!ObjectId.isValid(id) || id.length !== NUMBER_CONDITION)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    } });
    
  const idExist = await saleModel.findById(id);

  if (!idExist)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    } });

  next();
};

module.exports = saleIdExistMiddleware;
