const statusCodes = require('../utils/statusCodes');
const { errorReturn, code, msg } = require('../utils/errorMsg');

const ZERO = 0;

const largerThenZero = (qty) => qty > ZERO ? true : false;
const isString = (qty) => typeof qty === 'string' ? true : false;

module.exports = async (req, res, next) => {
  const { quantity } = req.body[0];
  if (isString(quantity)) return res.status(statusCodes.UNPR_ENTITY)
    .json(errorReturn(code.invData, msg.wrongIdOrQty));
  if (!largerThenZero(quantity)) return res.status(statusCodes.UNPR_ENTITY)
    .json(errorReturn(code.invData, msg.wrongIdOrQty));
  next();
};
