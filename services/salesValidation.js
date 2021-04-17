const zero = 0;

const invalidIdOrQuantity = (product) => {
  return product.map(item => {
    if(typeof(item.quantity) !== 'number' || item.quantity <= zero) return true;
    return false;
  }).some(item => item === true);
};

module.exports = {
  invalidIdOrQuantity
};