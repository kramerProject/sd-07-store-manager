const codes = require('../services/codes');
const productMiddlewaresQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  if (!Number.isInteger(quantity)) {

    return res.status(codes.notProcessed).json(
      {
        err: {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }
      }
    );
  }

  if (quantity <= zero) {
    return res.status(codes.notProcessed).json(
      {
        err: {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  next();
};

module.exports = productMiddlewaresQuantity;