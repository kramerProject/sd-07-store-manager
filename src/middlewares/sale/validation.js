const { getOne } = require('../../models/product');

const INVALID_DATA = 422;
const errCodeInvalid = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const saleValidation = (req, res, next) => {
  const productQuantity = req.body.map((product) => product.quantity);
  productQuantity.forEach(quantity => {
    if (typeof quantity != 'number' || quantity < 1)
      return res.status(INVALID_DATA).send(errCodeInvalid);
  });
  next();
};


module.exports = {
  saleValidation
};

