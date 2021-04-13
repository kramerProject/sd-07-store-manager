const quantityIsNumber = (quantity) => {
  if (typeof quantity !== 'number') return false;


  return true;
};

module.exports = quantityIsNumber;
