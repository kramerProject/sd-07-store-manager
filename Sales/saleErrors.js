const validationsToAdd = async (body) => {
  const typeNumber = body.every((sale) => typeof sale.quantity === 'number');
  if (!typeNumber) return true;
  
  const ZERO = 0;
  const isGtZERO = body.every((sale) => sale.quantity > ZERO);
  if (!isGtZERO) return true;

  return undefined;
};

module.exports = {
  validationsToAdd,
};
