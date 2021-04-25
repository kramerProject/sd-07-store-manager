module.exports = (name, quantity) => {
  const MINIMUM_PASSWORD_LENGTH = 6;
  const EMPTY_QUANTITY = 0;

  if (!name || name.length < MINIMUM_PASSWORD_LENGTH) {
    return {
      status: 'error',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity <= EMPTY_QUANTITY) {
    return {
      status: 'error',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity !== 'number') {
    return {
      status: 'error',
      message: '"quantity" must be a number',
    };
  }

  return { status: 'success' };
};
