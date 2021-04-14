const productValidation = (name, quantity) => {
  const FIVE = 5;
  const ZERO = 0;
  if (name.length <= FIVE || !name) return true;

  if (quantity <= ZERO || !quantity || typeof quantity === 'string') return true;

};

module.exports = productValidation;
