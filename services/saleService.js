const { isValidQuantity, isQuantityNumber } = require('./productService');

function validateQuantity(quantity) {
  if (isValidQuantity(quantity) && isQuantityNumber(quantity)) return true;
  return false;
}

const validateSale = (productsList, itemsSold, isUpdate) => {
  const productsIdList = productsList.map((product) => String(product._id));
  const itemsSoldIdList = itemsSold.map((item) => item.productId);
  const itemsSoldQuantityList = itemsSold.map((item) => item.quantity);
  const isValidId = itemsSoldIdList.some((itemId) => 
    productsIdList.some((productId) => productId === itemId));
  const isValidQuantity = itemsSoldQuantityList.some((itemQuantity) => 
    !validateQuantity(itemQuantity));
  if (isUpdate) return !isValidQuantity;
  if (isValidId && !isValidQuantity) return true;
  return false;
};

const validateStock = (itemsSold, productsList) => {
  return itemsSold.every((item) => 
    productsList.some((product) => 
      (item.productId === String(product._id)) && (item.quantity <= product.quantity)));
};

module.exports = {
  validateQuantity,
  validateSale,
  validateStock
};
