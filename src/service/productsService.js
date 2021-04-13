const productsModel = require('../model/productsModel');

const zero = 0;
const cinco = 5;
const unprocessable = 422;

const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const data = await productsModel.getAll();
  if (data.length > zero) {
    const arrayNames = data.map((e) => e.name);
    if (arrayNames.includes(name)) {
      res.status(unprocessable).send({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      });
      return null;
      next();
    };
  };
};

const checkProducts = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (typeof name !== 'string' || name.length <= cinco) {
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
    return null;
  }
  if (typeof quantity !== 'number') {
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
    return null;
  }
  if (!Number.isInteger(quantity) || quantity <= zero) {
    res.status(unprocessable).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
    return null;
  }
  next();
};

module.exports = { checkProducts, checkDuplicate };
