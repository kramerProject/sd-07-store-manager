const validInsertQuantity = (quantity) => {
  if (!quantity || quantity < 1) return false;

  return true;
};

module.exports = validInsertQuantity;
