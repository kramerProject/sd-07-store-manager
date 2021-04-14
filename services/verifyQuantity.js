const length = (quantity) => {
  const minLength = 0; 
  if (quantity <= minLength) return false;
  return true;
};

const type = (quantity) => {
  if (typeof quantity === 'number') return true;
  return false;
};

module.exports = {
  length,
  type,
};