const UnprocessableEntry = 422;

const validateProductData = (req, res, next) => {
  const { name, quantity } = req.body;
  const zero = 0;
  const tamanhoMinProductName = 5;
  if (name.length < tamanhoMinProductName) {
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
  if (quantity <= zero) {
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