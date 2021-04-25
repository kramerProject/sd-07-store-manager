const quantityValidation = (quantity) => {
  if (typeof quantity !== 'number') throw new Error('"quantity" must be a number');
  if (+quantity < 1) throw new Error('"quantity" must be larger than or equal to 1');
  return false;
};

module.exports = quantityValidation;