const Product = require('../models/productModel');
const statusCodes = require('../utils/statusCodes');
const { errorReturn, code, msg } = require('../utils/errorMsg');

const ZERO = 0;
const CINCO = 5;

const nameExists = async (name) => {
  const products = await Product.getAll();
  return products.some((item) => item.name === name);
};

const shortName = (name) => (name.length < CINCO ? true : false);
const largerThenZero = (qty) => (qty > ZERO ? true : false);
const isString = (qty) => (typeof qty === 'string' ? true : false);

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (shortName(name))
    return res.status(statusCodes.UNPR_ENTITY)
      .json(errorReturn(code.invData, msg.shortName));
  if (isString(quantity))
    return res.status(statusCodes.UNPR_ENTITY)
      .json(errorReturn(code.invData, msg.isString));
  if (!largerThenZero(quantity))
    return res.status(statusCodes.UNPR_ENTITY)
      .json(errorReturn(code.invData, msg.lessThanZero));
  if (await nameExists(name)) {
    return await res
      .status(statusCodes.UNPR_ENTITY)
      .json(errorReturn(code.invData, msg.nameExists));
  }
  next();
};
