const quantityValidate = async (req, res, next) => {
  const { quantity } = req.body;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = 422;

  err.message = '"quantity" must be a number';
  if (typeof quantity !== 'number') next(err);

  err.message = '"quantity" must be larger than or equal to 1';
  if (quantity < 1) next(err);
  next();
};

module.exports = quantityValidate;