const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const nameValidate = (req, _res, next) => {
  const { id } = req.params;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = UNPROCESSABLE_ENTITY;
  err.message = 'Wrong id format';

  if (!ObjectId.isValid(id)) next(err);

  next();
};

module.exports = nameValidate;

