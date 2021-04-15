const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const quantityOrWrongId = async (req, res, next) => {
  const err = new Error();
  err.code = 'invalid_data';
  err.message = 'Wrong product ID or invalid quantity';
  req.body.forEach( ({ quantity, productId }) => {
    if (!ObjectId.isValid(productId)) {
      res.status(UNPROCESSABLE_ENTITY).json({ err });
      next(err);
      return;
    }
    if (typeof quantity !== 'number') {
      res.status(UNPROCESSABLE_ENTITY).json({ err });
      next(err);
      return;
    }
    if (quantity < 1) {
      res.status(UNPROCESSABLE_ENTITY).json({ err });
      next(err);
      return;
    }
    return;
  });
  next();
};

module.exports = quantityOrWrongId;
