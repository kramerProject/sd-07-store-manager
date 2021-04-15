const productService = require('../services/ProductService');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const productNameVerify = (req, res, next) => {
  const { name } = req.body;
  (productService.nameVerify(name))
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
};

const productQuantityVerify = (req, res, next) => {
  const { quantity } = req.body;
  (productService.quantityVerify(quantity))
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
};

const productQuantityTypeVerify = (req, res, next) => {
  const { quantity } = req.body;
  (typeof quantity === 'number')
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
};

const productExists = async (req, res, next) => {
  const { name } = req.body;
  try {

    (await productService.productExists(name))
      ? res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      })
      : next();     
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'erro interno'});
  }
};

module.exports = {
  productNameVerify,
  productExists,
  productQuantityVerify,
  productQuantityTypeVerify,
};
