const productsModel = require('../model/productsModel');

const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const data = await productsModel.getAll();
  if (data.length > 0) {
    const arrayNames = data.map((e) => e.name);
    if (arrayNames.includes(name)) {
      res.status(422).send({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      });
      return null;
    }
  }
  next();
};

const checkProducts = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (typeof name !== 'string' || name.length <= 5) {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
    return null;
  }
  if (typeof quantity !== 'number') {
    res.status(422).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
    return null;
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    res.status(422).send({
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
