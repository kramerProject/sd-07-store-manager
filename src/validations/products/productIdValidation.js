const { ObjectId } = require('mongodb');

const productIdValidation = (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  return false;
};

module.exports = productIdValidation;
