const Product = require('../models/productModel');

const shortNameMsg = '"name" length must be at least 5 characters long';
const nameExistsMsg = 'Product already exists';
const lessThanZeroMsg = '"quantity" must be larger than or equal to 1';
const isStringMsg = '"quantity" must be a number';

const ERR_UNPR_ENTITY = 422;
const ZERO = 0;
const CINCO = 5;

const errorReturn = (msg) => {
  return {
    'err': {
      'code': 'invalid_data',
      'message': `${msg}`
    }
  };
};

const nameExists = async (name) => {
  const products = await Product.getAll();
  return products.some((item) => item.name === name);
};

const shortName = (name) =>  name.length < CINCO ? true : false;
const lagerThenZero = (qty) => qty > ZERO ? true : false;
const isString = (qty) => typeof qty === 'string' ? true : false;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (shortName(name)) return res.status(ERR_UNPR_ENTITY).json(errorReturn(shortNameMsg));
  if (isString(quantity))
    return res.status(ERR_UNPR_ENTITY).json(errorReturn(isStringMsg));
  if (!lagerThenZero(quantity))
    return res.status(ERR_UNPR_ENTITY).json(errorReturn(lessThanZeroMsg));
  if (await nameExists(name)) {
    return await res.status(ERR_UNPR_ENTITY).json(errorReturn(nameExistsMsg));
  }
  next();
};
