const SalesModel = require('../models/SalesModel');
const ApiStatusCode = require('../enums/ApiStatusCode');

const errors = {
  NOT_VALID_NAME: '"name" length must be at least 5 characters long',
  NOT_VALID_QUANTITY: 'Wrong product ID or invalid quantity',
  SALE_NOTFOUND: 'Sale not found',
  QUANTITY_WRONG_FORMAT: 'Wrong product ID or invalid quantity',
  WRONG_ID_FORMAT: { err: 
    {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  }
};

const isQuantityGreaterThan = (quantity, min) => quantity > min;
const isString = (quantity) => typeof(quantity) === 'string';

const validateQuantity = async function (req, res, next) {
  const min = 0;
  const sales = req.body;
  const code = 'invalid_data';

  if (sales.some(sale => !isQuantityGreaterThan(sale.quantity, min))) {
    return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
      .json({ err: { code, message: errors.NOT_VALID_QUANTITY}});
  } else if (sales.some(sale => isString(sale.quantity))) {
    return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
      .json({ err: { code, message: errors.QUANTITY_WRONG_FORMAT}});
  }
  next();
};

const validateSalesExistance = async function (req, res, next) {
  const { id } = req.params;
  const min = 24;
  const code = 'not_found';
  
  if (id.length < min) return res.status(ApiStatusCode.WRONG_PRODUCT_FORMAT)
    .json(errors.WRONG_ID_FORMAT);

  const isSalesExists = await SalesModel.getSalesById(id);

  if (!isSalesExists) {
    return res.status(ApiStatusCode.NOT_FOUND).json();
  } 

  next();
};

module.exports = {
  validateQuantity,
  validateSalesExistance,
  errors
};