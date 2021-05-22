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

module.exports = {
  nameValidation,
};
