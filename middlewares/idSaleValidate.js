const { NOT_FOUND } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const idSaleValidate = (req, res, next) => {
  const { id } = req.params;
  const err = new Error();
  err.code = 'not_found';
  err.message = 'Sale not found';

  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json({ err });

  next();
};

module.exports = idSaleValidate;

