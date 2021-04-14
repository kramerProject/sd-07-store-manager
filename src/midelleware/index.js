const {
  STATUS_422,
  SIZE_MIN_NAME,
  ZERO,
  CODE_ERROR } = require('../valuesGlobal');

const checkDateCreationMidlleware = (req, res, next) => {
  const { name, quantity } = req.body;

  if (name.length < SIZE_MIN_NAME) {
    return res.status(STATUS_422).send({ err: {
      code: CODE_ERROR,
      message: '"name" length must be at least 5 characters long'}});
  }

  if (typeof quantity === 'string') {
    return res.status(STATUS_422).send({ err: {
      code: CODE_ERROR,
      message: '"quantity" must be a number'}});
  }

  console.log(typeof quantity === 'string');
  if (quantity <= ZERO) {
    return res.status(STATUS_422).send({ err: {
      code: CODE_ERROR,
      message: '"quantity" must be larger than or equal to 1'}});
  }

  next();
};

module.exports = {
  checkDateCreationMidlleware,
};
