const { UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');
const { ObjectId } = require('mongodb');

const quantityOrWrongId = async (req, res, next) => {
  const err = new Error();
  err.code = 'invalid_data';
  err.message = 'Wrong product ID or invalid quantity';
  const ZERO = 0;
  req.body.forEach( ({ quantity, productId }) => {
    if (!ObjectId.isValid(productId)) {
      return res.status(UNPROCESSABLE_ENTITY).json({ err });
    }
    if (typeof quantity !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY).json({ err });
    }
    if (quantity < 1) return res.status(UNPROCESSABLE_ENTITY).json({ err });
    return;
  });
  next();
};

module.exports = quantityOrWrongId;

