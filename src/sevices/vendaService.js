const zero = 0;

const validQuant = (quantity) => {
  if (quantity <= zero || typeof quantity !== 'number') {
    return false;
  }
  return true;
};

module.exports = validQuant;
