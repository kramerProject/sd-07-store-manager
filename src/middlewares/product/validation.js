const { getAll } = require('../../models/product');

const INVALID_DATA = 422;

const nameValidation = async (req, res, next) => {
  const minLength = 5;
  const { name } = req.body;
  if (!name || name.length < minLength) {
    return res.status(INVALID_DATA).json(
      {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      }
    );
  }
  next();
};

const nameAlreadyExists = async (req, res, next) => {
  const { name } = req.body;
  const products = await getAll();
  const nameExists = products.find(product => product.name === name);
  if (nameExists) {
    return res.status(INVALID_DATA).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      }
    );
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const minQty = 1;
  const { quantity } = req.body;
  if (!quantity || quantity < minQty) {
    return res.status(INVALID_DATA).send(
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        }
      }
    );
  }
  if (typeof quantity != 'number') {
    return res.status(INVALID_DATA).send(
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        }
      }
    );
  }
  next();
};

module.exports = {
  nameValidation,
  nameAlreadyExists,
  quantityValidation,
};
