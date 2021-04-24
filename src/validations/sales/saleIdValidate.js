const { ObjectId } = require('mongodb');

const saleIdValidate = (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale id format');
  return false;
};

module.exports = saleIdValidate;
