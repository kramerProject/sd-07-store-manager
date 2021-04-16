const UnprocessableEntry = 422;

const validateProductData = (req, res, next) => {
  const { name, quantity } = req.body;
  if (name.length < 5) {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (typeof quantity === 'string') {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= 0) {
    return res.status(UnprocessableEntry).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};


module.exports = validateProductData;