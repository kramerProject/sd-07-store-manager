const codes = require('../codes');
const productMiddlewaresName = (req, res, next) => {
  const { name } = req.body;
  const five = 5;
  if (!name || name.length < five) {
    return res.status(codes.notProcessed).json(
      {
        err: {
          code: 'invalid_data',
          message: '\"name\" length must be at least 5 characters long'
        }
      }
    );
  }

  next();
};

module.exports = productMiddlewaresName;