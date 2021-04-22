const salesModel = require('../models/salesModel');

const { ObjectId } = require('mongodb');

const status404 = 404;
const status422 = 422;

const idDeleteMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }

  const findId = await salesModel.getById(id);
  if (findId === null) {
    return res.status(status404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }

  next();
};

module.exports = idDeleteMiddleware;
