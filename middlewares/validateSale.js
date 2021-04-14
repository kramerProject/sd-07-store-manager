const ERR_UNPR_ENTITY = 422;
const ZERO = 0;

const errorReturn = () => {
  return {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    }
  };
};

const largerThenZero = (qty) => qty > ZERO ? true : false;
const isString = (qty) => typeof qty === 'string' ? true : false;

module.exports = async (req, res, next) => {
  const { quantity } = req.body[0];
  if (isString(quantity)) return res.status(ERR_UNPR_ENTITY).json(errorReturn());
  if (!largerThenZero(quantity)) return res.status(ERR_UNPR_ENTITY).json(errorReturn());
  next();
};
