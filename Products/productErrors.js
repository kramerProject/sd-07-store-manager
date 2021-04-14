const validationsToAdd = async (name, quantity, itemName) => {
  const ZERO = 0;
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= ZERO) return '"quantity" must be larger than or equal to 1';

  const FIVE = 5;
  if (name.length < FIVE) return '"name" length must be at least 5 characters long';
  if (itemName) return 'Product already exists';

  return undefined;
};

const validationsToUpdate = async (name, quantity) => {
  const ZERO = 0;
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= ZERO) return '"quantity" must be larger than or equal to 1';
  
  const FIVE = 5;
  if (name.length < FIVE) return '"name" length must be at least 5 characters long';

  return undefined;
};

module.exports = {
  validationsToAdd,
  validationsToUpdate
};
