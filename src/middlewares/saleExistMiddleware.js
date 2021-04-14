const saleModel = require('../models/saleModel');
const { ObjectId } = require('mongodb');

const saleExistMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const NUMBER_CONDITION = 24;

  if (!ObjectId.isValid(id) || id.length !== NUMBER_CONDITION)
    return res.status('404').send({ err: {
      code: 'not_found',
      message: 'Sale not found'
    } });

  const idExist = await saleModel.findById(id);

  if (!idExist)
    return res.status('404').send({ err: {
      code: 'not_found',
      message: 'Sale not found'
    } });

  next();
};

module.exports = saleExistMiddleware;
