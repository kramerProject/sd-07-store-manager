const productModel = require('../models/productModel');
const statusInvalidData = 422;
const minNameLength = 5;
const minQuantity = 0;

const nameAndQuantityValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  if(name.length < minNameLength) {
    return res.status(statusInvalidData).json({
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    });
  }
  if (isNaN(quantity)) {
    return res.status(statusInvalidData).json({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    });
  }
  if (quantity <= minQuantity) {
    return res.status(statusInvalidData).json({
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    });
  }
  next();
};

module.exports = {
  nameAndQuantityValidation
};
