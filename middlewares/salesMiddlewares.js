const { UnprocessableException } = require('../utils/errorHandler');
const { validateQuantity } = require('../services/saleService');
const { getAll } = require('../models/productModel');

const validateSale = (productsList, itemsSold) => {
  const productsIdList = productsList.map((product) => String(product._id));
  const itemsSoldIdList = itemsSold.map((item) => item.productId);
  const itemsSoldQuantityList = itemsSold.map((item) => item.quantity);
  const isValidId = itemsSoldIdList.some((itemId) => 
    productsIdList.some((productId) => productId === itemId));
  const isValidQuantity = itemsSoldQuantityList.some((itemQuantity) => 
    !validateQuantity(itemQuantity));
  if (isValidId && !isValidQuantity) return true;
  return false;
};

exports.validateSaleMiddleware = async (req, _res, next) => {
  const invalidSaleErrorMessage = 'Wrong product ID or invalid quantity';
  try {
    const productsList = await getAll();
    const itemsSold = req.body;
    if (!validateSale(productsList, itemsSold)) {
      throw new UnprocessableException(
        invalidSaleErrorMessage
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
