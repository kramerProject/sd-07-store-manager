const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const idValidate = (req, res, next) => {
  const { id } = req.params;
  const err = new Error();
  err.code = 'invalid_data';
  err.message = 'Wrong id format';

  if (!ObjectId.isValid(id)) return res.status(UNPROCESSABLE_ENTITY).json({ err });

  next();
};

module.exports = idValidate;

