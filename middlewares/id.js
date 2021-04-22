// const productModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const status422 = 422;

const idMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);

  if (!validId) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }

  next();
};

module.exports = idMiddleware;
