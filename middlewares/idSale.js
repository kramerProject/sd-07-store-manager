// const productModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const status404 = 404;

const idSaleMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);

  if (!validId) {
    return res.status(status404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }

  next();
};

module.exports = idSaleMiddleware;
