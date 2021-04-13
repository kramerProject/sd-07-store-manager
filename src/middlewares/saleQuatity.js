const codes = require('../services/codes');


const check = (body) => {
  const zero = 0;
  
  if(!body.length) return false;
  
  const numberSale = body.map((item) => {
    return item.quantity;
  });
  for (let index = zero; index < numberSale.length; index++) {
    if (!Number.isInteger(numberSale[index]) || numberSale[index] <= zero) {
      return false;
    }
  }

  return true;
};
const productMiddlewaresQuantity = (req, res, next) => {
  const { body } = req;
  if (!check(body)) {

    return res.status(codes.notProcessed).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      }
    );
  }
  next();
};

module.exports = productMiddlewaresQuantity;