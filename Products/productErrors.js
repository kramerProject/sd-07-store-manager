const validationsToAdd = async (name, quantity, itemName) => {
  const ZERO = 0;
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= ZERO) return '"quantity" must be larger than or equal to 1';

  const FIVE = 5;
  if (name.length < FIVE) return '"name" length must be at least 5 characters long';
  // const existName = itemName.find((name) => name === itemName.name);
  if (itemName) return 'Product already exists';

  return undefined;
};

module.exports = {
  validationsToAdd,
};
