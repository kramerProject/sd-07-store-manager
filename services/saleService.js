const { isValidQuantity, isQuantityNumber } = require('./productService');

function validateQuantity(quantity) {
  if (isValidQuantity(quantity) && isQuantityNumber(quantity)) return true;
  return false;
}

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

module.exports = {
  validateQuantity,
  validateSale
};
