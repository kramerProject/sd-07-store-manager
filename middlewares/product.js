const productModel = require('../models/productModel');

const status422 = 422;

const productMiddleware = async (req, res, next) => {
  const { name, quantity } = req.body;

  const minLength = 5;

  if (name && name.length < minLength) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }

  const findName = await productModel.getByName(name);
  if (findName) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });
  }

  const minValue = 1;
  if (quantity < minValue) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }

  const typeIs = typeof quantity;
  if (typeIs === 'string') {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    });
  }


  next();
};

module.exports = productMiddleware;
