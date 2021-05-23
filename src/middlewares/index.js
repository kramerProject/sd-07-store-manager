const { findName, getProduct } = require('../models/Products');
const ERROR = 422;

const name = (req, res, next) => {
  const MIN_NAME_LENGHT = 5;
  const { name } = req.body;
  if (typeof name !== 'string') return res.status(ERROR)
    .json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string',
      },
    });

  if ((name === '') || (name === undefined) || (name.length < MIN_NAME_LENGHT)) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  };
  next();
};

const quant = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  if (typeof quantity !== 'number') return res.status(ERROR)
    .json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  if ((+quantity < 1) || (+quantity == zero)) return res.status(ERROR).json({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  });
  next();
};

const exist = async(req, res, next) => {
  const { name } = req.body;
  let check = await findName(name);
  if (check) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const noexist = async(req, res, next) => {
  const { id } = req.params;
  let check = await getProduct(id);
  if (!check) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = { name, quant, exist, noexist };