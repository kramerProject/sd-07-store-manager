/*  const { getOne } = require('../../models/product');

const INVALID_DATA = 422;
const errCodeInvalid = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const saleValidation = async (req, res, next) => {
const productQuantity = req.body.map((product) => product.quantity);
  productQuantity.forEach(id => {
    if (id < 1) {
      return res.status(INVALID_DATA).json(errCodeInvalid);
    }
  });

  const productIds = req.body.map((product) => product.productId);
  productIds.forEach(async id => {
    if (await getOne(id) == null) {
      return res.status(INVALID_DATA).json(errCodeInvalid);
    }
  });
  next();
};


module.exports = {
  saleValidation
};
*/
