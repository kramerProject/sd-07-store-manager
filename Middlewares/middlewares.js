const productsModel = require('../Models/ProductsModel');
const status = require('../helpers/statusCode');

const localeProduct = async (name) => {
  const products = await productsModel.getAllProducts();
  const isProduct = products.some(products => products.name === name);
  return isProduct;
};

const ProductNameMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const five = 5;
  if (name.length < five) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  const isProduct = await localeProduct(name);
  if (isProduct) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const ProductAmountMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  const zero = 0;
  if (Number(quantity) <= zero) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  if (typeof (quantity) !== 'number') {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

const SaleNameMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const five = 5;
  if (name.length < five) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  next();
};

const SaleProductAmountMiddleware = (req, res, next) => {
  const { body } = req;
  const zero = 0;
  const validValues = body
    .some((item) => {
      return typeof item.quantity !== 'number' || item.quantity <= zero;
    });

  if (validValues) {
    return res.status(status.unprocess).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

module.exports = {
  ProductNameMiddleware,
  ProductAmountMiddleware,
  SaleNameMiddleware,
  SaleProductAmountMiddleware
};