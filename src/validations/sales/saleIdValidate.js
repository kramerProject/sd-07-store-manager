const { ObjectId } = require('mongodb');

const saleIdValidate = (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  return;
};

module.exports = saleIdValidate;
