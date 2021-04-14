const { UnprocessableException } = require('../utils/errorHandler');
const { isValidName } = require('../utils/productValidations');

exports.validateNameMiddleware = (req, _res, next) => {
  const invalidNameErrorMessage = '"name" length must be at least 5 chatacters long';
  const { name } = req.body;
  if (!isValidName(name)) throw new UnprocessableException(invalidNameErrorMessage);
  next();
};
