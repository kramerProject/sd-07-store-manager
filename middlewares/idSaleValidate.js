const { NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const idSaleValidate = (req, res, next) => {
  const { id } = req.params;
  const { method } = req;
  const err = new Error();
  err.code = 'not_found';
  err.message = 'Sale not found';
  res.status(NOT_FOUND);
  if (method === 'DELETE'){
    res.status(UNPROCESSABLE_ENTITY);
    err.code = 'invalid_data';
    err.message = 'Wrong sale ID format';
  }

  if (!ObjectId.isValid(id)) return res.json({ err });

  next();
};

module.exports = idSaleValidate;

