const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const quantityValidate = async (req, res, next) => {
  const { quantity } = req.body;
  const err = new Error();
  err.code = 'invalid_data';

  err.message = '"quantity" must be a number';
  if (typeof quantity !== 'number') res.status(UNPROCESSABLE_ENTITY).json({ err });

  err.message = '"quantity" must be larger than or equal to 1';
  if (quantity < 1) res.status(UNPROCESSABLE_ENTITY).json({ err });
  next();
};

module.exports = quantityValidate;