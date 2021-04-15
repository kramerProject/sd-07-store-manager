const UNPROCESSABLE_ENTITY = 422;
const minLength = 5;
const ONE = 1;

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  if(name.length < minLength) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: '"name" length must be at least 5 characters long',
        code: 'invalid_data',
      }
    });
  }

  if(quantity < ONE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: '"quantity" must be larger than or equal to 1',
        code: 'invalid_data',
      }
    });
  }

  if(typeof quantity === 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: '"quantity" must be a number',
        code: 'invalid_data',
      }
    });
  }

  next();
};

module.exports = validateProduct;
