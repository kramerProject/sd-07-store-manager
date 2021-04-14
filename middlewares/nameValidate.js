const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const nameValidate = (req, res, next) => {
  const { name } = req.body;
  const err = new Error();
  err.code = 'invalid_data';

  const MIN_CHARACTERS = 5;
  err.message = '"name" length must be at least 5 characters long';
  if (name.length < MIN_CHARACTERS) return res.status(UNPROCESSABLE_ENTITY).json({ err });
  next();
};

module.exports = nameValidate;
