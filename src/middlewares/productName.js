const codes = require('../services/codes');
const productNameMid = (req, res, next) => {
  const { name, quantity } = req.body;

  if (name.length < number) {
    return res.status(codes.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (quantity < 1) {
    return res.status(codes.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

module.exports = productNameMid;
