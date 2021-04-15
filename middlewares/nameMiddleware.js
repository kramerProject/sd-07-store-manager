const { UNPROCESSABLE_ENTITY } = require('../helpers/status');

const nameMiddleware = (req, res, next) => {
  const FIVE = 5;
  const { name } = req.body;
  if (name.length < FIVE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }
  next();
};

module.exports = nameMiddleware;
