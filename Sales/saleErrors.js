const validations = (body) => {
  // console.log(body);
  const typeNumber = body.every((sale) => typeof sale.quantity === 'number');
  if (!typeNumber) return true;
  
  const ZERO = 0;
  const isGtZERO = body.every((sale) => sale.quantity > ZERO);
  if (!isGtZERO) return true;

  return false;
};

module.exports = {
  validations,
};
